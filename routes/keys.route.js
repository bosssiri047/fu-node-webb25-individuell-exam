import { Router } from 'express';
import { getKey } from '../services/keys.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
	const result = await getKey();
	if (result.success) {
		res.json({
			success: true,
			key: result.key,
		});
	} else {
		next({
			status: 404,
			message: result.message,
		});
	}
});

export default router;
