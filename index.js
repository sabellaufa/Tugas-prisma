const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/skincare", async (req, res) => {
  try {
    const tb_skincares = await prisma.tb_skincare.findMany();
    res.status(200).json({ message: "skincare ditampilkan", tb_skincares });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addSkincare", async (req, res) => {
  const { namaproduct, brand, hargaproduct,nomorproduct,typeproduct  } = req.body;

  try {
    const tb_skincareExists = await prisma.tb_skincare.findUnique({
      where: { nomorproduct },
    });

    if (tb_skincareExists) {
      return res.status(400).json({ error: "skincare sudah ada" });
    }

    const tb_skincare = await prisma.tb_skincare.create({
      data: {
        namaproduct,
        brand,
        hargaproduct,
        nomorproduct,
        typeproduct,
      },
    });

    res.status(201).json({ message: "skincare sudah di tambahkan", tb_skincare });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/updateskincare/:nomorproduct", async (req, res) => {
  const nomorproduct = parseInt(req.params.nomorproduct);
  const {namaproduct, brand, hargaproduct,typeproduct } = req.body;

  try {
    const isExists = await prisma.tb_skincare.findUnique({
      where: { nomorproduct },
    });

    if (!isExists) {
      return res.status(400).json({ error: "skincare tidak di temukan" });
    }

    const updatetb_skincare = await prisma.tb_skincare.update({
      where: { nomorproduct },
      data: {
        namaproduct,
        brand,
        hargaproduct,
        nomorproduct,
        typeproduct,
      },
    });

    res.status(202).json({ message: "skincare sudah di update", updatetb_skincare });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteSkincare/:nomorproduct", async (req, res) => {
  const nomorproduct = parseInt(req.params.nomorproduct);

  try {
    const isExists = await prisma.tb_skincare.findUnique({
      where: { nomorproduct },
    });
    if (!isExists) {
      return res.json({ error: "skincare tidak di temukan" });
    }
    const deletetb_skincare = await prisma.tb_skincare.delete({
      where: { nomorproduct },
    });
    res.status(202).json({ message: "skincare berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});