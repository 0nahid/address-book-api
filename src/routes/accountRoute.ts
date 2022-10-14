import { Router } from "express";
const router: Router = Router();

import { accountRouter } from "../controllers/accountController";

router.post("/signup", accountRouter.signup);
router.post("/login", accountRouter.login);
router.get("/users", accountRouter.getAllUsers);
router.post("/bulk", accountRouter.addBulkUsers);

export default router;