-- CreateTable
CREATE TABLE `kode_referensi` (
    `kode_indikator` VARCHAR(20) NOT NULL,
    `nama_indikator` VARCHAR(255) NOT NULL,
    `parent_kode` VARCHAR(20) NULL,
    `parent/child` VARCHAR(20) NULL,
    `definisi` TEXT NULL,
    `rumus_perhitungan` TEXT NULL,
    `klasifikasi` VARCHAR(100) NULL,
    `satuan` VARCHAR(50) NULL,
    `indikator_rpjpn` VARCHAR(100) NULL,
    `indikator_rpjmn` VARCHAR(100) NULL,
    `indikator_sdgs` VARCHAR(100) NULL,
    `indikator_sipd` VARCHAR(100) NULL,
    `tagging_rad` VARCHAR(100) NULL,

    PRIMARY KEY (`kode_indikator`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standar_datas` (
    `Kode SDS` VARCHAR(20) NOT NULL,
    `Nama Data` VARCHAR(255) NOT NULL,
    `Konsep` TEXT NULL,
    `Definisi` TEXT NULL,
    `Penyajian` TEXT NULL,
    `Isian` TEXT NULL,
    `Ukuran` VARCHAR(100) NULL,
    `Satuan` VARCHAR(100) NULL,

    PRIMARY KEY (`Kode SDS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
