import { Router } from "express";
const router: Router = Router();

import { accountRouter } from "../controllers/accountController";
import { verifyToken } from "../middleware/verifyToken";

router.post("/signup", accountRouter.signup);
router.post("/login", accountRouter.login);
router.get("/users", verifyToken, accountRouter.getAllUsers);
router.post("/bulk",verifyToken, accountRouter.addBulkUsers);
router.get("/user/:id", verifyToken,accountRouter.getUserById);
router.delete("/user/:id",verifyToken, accountRouter.deleteUser);
router.delete("/delete/:id",verifyToken, accountRouter.deleteUser);




export default router;