// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
	const reqHeaders = new Headers(request.headers);
	// console.log('reqHeaders', reqHeaders)
	reqHeaders.set('x-request-url', request.url);
	return NextResponse.next({
		request: {
			headers: reqHeaders,
		}
	});
}
