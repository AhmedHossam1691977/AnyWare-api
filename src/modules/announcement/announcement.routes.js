import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { limiter } from "../../middleware/rateLimit .js";
import { addAnnouncement, allAnnouncement, deleteAllAnnouncement, getAllAnnouncementById, updateAllAnnouncement } from "./announcement.controller.js";
import { addAnnouncementVal, paramsIdVal, updateAnnouncementVal } from "./announcement.validation.js";

const announcementRouter = express.Router();


announcementRouter.route('/')
.post(protectedRoutes,allowedTo("admin"),validation(addAnnouncementVal),limiter(50),addAnnouncement)
.get(allAnnouncement)

announcementRouter.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),limiter(),getAllAnnouncementById)
.patch(protectedRoutes,allowedTo("admin"),validation(updateAnnouncementVal),updateAllAnnouncement)
.delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteAllAnnouncement)


export default announcementRouter;