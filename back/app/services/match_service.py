from app.models.profile.profile import Profile
from app.models.chat import Chat
from app.models.like_history import LikeHistory


async def find_match(user_id: str, filters: dict = {}) -> Profile:
    # Отримуємо історію лайків користувача
    liked_users = await LikeHistory.find(LikeHistory.user_id == user_id).to_list()
    liked_user_ids = [like.liked_user_id for like in liked_users]

    # Пошук підходящих профілів
    profiles = await Profile.find(~Profile.id.in_(liked_user_ids), **filters).to_list()

    # Сортування за пріоритетами (знак зодіаку, версія AI тощо)
    profiles = sorted(profiles, key=lambda p: p.priority_score(), reverse=True)

    if profiles:
        return profiles[0]
    else:
        return None

async def like_user(liker_id: str, liked_id: str):
    # Зберігаємо історію лайку
    like_history = LikeHistory(user_id=liker_id, liked_user_id=liked_id)
    await like_history.insert()

    # Перевіряємо, чи є взаємний лайк
    reverse_like = await LikeHistory.find_one(
        LikeHistory.user_id == liked_id, LikeHistory.liked_user_id == liker_id
    )
    if reverse_like:
        # Створюємо чат
        chat = Chat(user1_id=liker_id, user2_id=liked_id)
        await chat.insert()
        return chat
    else:
        return None