export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, targetAudience, startDate, endDate } = req.body;
    console.log(title, content, targetAudience, startDate, endDate);
  } catch (error) {
    console.log(error);
  }
};
export const getAllAnnouncementForAdmin = async (req, res) => {};
export const getActiveAnnouncementForClient = async (req, res) => {};
export const updateAnnouncement = async (req, res) => {};
export const deleteAnnouncement = async (req, res) => {};
