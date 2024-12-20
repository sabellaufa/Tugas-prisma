-- CreateTable
CREATE TABLE `tb_skincare` (
    `namaproduct` VARCHAR(50) NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `hargaproduct` INTEGER NOT NULL,
    `nomorproduct` INTEGER NOT NULL AUTO_INCREMENT,
    `typeproduct` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`nomorproduct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
