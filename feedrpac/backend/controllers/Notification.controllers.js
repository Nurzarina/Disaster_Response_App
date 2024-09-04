import Notification from '../models/Notifications.model.js';


export const getNotifications = async (req, res) => {

    try {
        
        const userId = req.user.id;
        const notifications = await Notification.find({ to:userId}).populate({
            path: "from",
            select: "username profileImage"
        })

        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notifications);

    } catch (error) {
       console.log("Error in getNotifications function". error.message);
       res.status(500).json({ message: "Internal server error" });
    }
        
};

export const deleteNotifications = async (req, res) => {

    try {
        
        const userId = req.user.id;

        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });


    } catch (error) {
        console.log("Error in deleteNotifications function". error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteOneNotification = async (req, res) => {
    try {
        
        const notificationId = req.params.id;
        const userId = req.user.id;
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notification.to.toString()!== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification deleted successfully" });
        



    } catch (error) {
        console.log("Error in deleteOneNotification function". error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};