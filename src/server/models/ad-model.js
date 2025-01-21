import prisma from "@/server/lib/prisma-client";

function getAllAds() {
    return prisma.ad.findMany({
        select: {
            name: true,
            type: true,
            image: true,
        }
    })
}

const adModel = {
    getAllAds,
};

export default adModel;