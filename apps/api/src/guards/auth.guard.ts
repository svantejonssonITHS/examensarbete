// External dependencies
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { decode, verify } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

// Internal dependencies
import env from '../utils/env.util';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();

			const token = request.headers['authorization']?.split(' ')[1];

			if (!token) throw new Error();

			const client = new JwksClient({
				jwksUri: `https://${env.AUTH0_DOMAIN}/.well-known/jwks.json`
			});

			const decoded = decode(token, { complete: true });

			if (!decoded?.payload?.sub) throw new Error();

			// Save the user object to the request
			request.user = decoded.payload;

			const key = await client.getSigningKey(decoded.header.kid);

			const verifiedToken = verify(token, key.getPublicKey(), {
				algorithms: ['RS256']
			});

			if (!verifiedToken) throw new Error();
			else return true;
		} catch (error) {
			throw new UnauthorizedException({
				success: false,
				message: 'Unauthorized'
			});
		}
	}
}
