import { Router } from "express";
const router: Router = Router();

import { accountRouter } from "../controllers/accountController";

router.post("/signup", accountRouter.signup);

export default router;