-- Rename the original street column to match the frontend address shape.
ALTER TABLE "Address"
RENAME COLUMN "street" TO "addressLine1";

-- Expand the address table to store full delivery details used by the UI.
ALTER TABLE "Address"
ADD COLUMN "label" TEXT NOT NULL DEFAULT '',
ADD COLUMN "fullName" TEXT NOT NULL DEFAULT '',
ADD COLUMN "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN "phone" TEXT NOT NULL DEFAULT '',
ADD COLUMN "addressLine2" TEXT;

ALTER TABLE "Address" ALTER COLUMN "label" DROP DEFAULT;
ALTER TABLE "Address" ALTER COLUMN "fullName" DROP DEFAULT;
ALTER TABLE "Address" ALTER COLUMN "email" DROP DEFAULT;
ALTER TABLE "Address" ALTER COLUMN "phone" DROP DEFAULT;
