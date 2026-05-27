import type { FileRouter } from 'uploadthing/server'
import { createUploadthing } from 'uploadthing/server'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const uploadRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	}).onUploadComplete(async ({ file }) => {
		// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
		return { file: file.ufsUrl }
	}),
	pdfUploader: f({
		pdf: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: '32MB',
			maxFileCount: 1,
		},
	}).onUploadComplete(async ({ file }) => {
		// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
		console.log(file)
		return { file: file.ufsUrl }
	}),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
