export const optimerCloudinaryBilder = (url, bredde = 200) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/w_${bredde * 3},f_auto,q_auto/`);
};