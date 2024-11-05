from beanie import Document

class LikeHistory(Document):
    user_id = str
    liked_user_id = str

    class Settings:
        collection = "like_history"