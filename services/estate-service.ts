import estateRepository from "../repositories/estate-repository";
import repository from "../repositories/estate-repository";

const getAllEstates = async () => {
  const data = await repository.getAllEstates();
  const result: any[] = [];

  data.forEach((element: any) => {
    const estate: any = {
      id: Number(element.id),
      town: String(element.grad),
      title: String(element.naziv),
      description: String(element.description),
      price: Number(element.cijena),
      imgLinks: [],
      isAvailable: Number(element.isAvailable),
    };
    if (element.img_no1) {
      estate.imgLinks.push(element.img_no1);
    }
    if (element.img_no2) {
      estate.imgLinks.push(element.img_no2);
    }

    result.push(estate);
  });

  return result;
};

const getEstateById = async (id: number) => {
  try {
    // Pozivamo repository da dobijemo podatke za nekretninu sa datim ID-om
    const data = await repository.getEstateById(id);

    // Ako ne postoji podatak za dati ID, vratimo null
    if (!data || data.length === 0) {
      return null;
    }

    // Pristupamo prvom elementu u nizu
    const estateData = data[0];

    // Formiramo objekat sa podacima o nekretnini
    const estate = {
      id: estateData.id,
      town: estateData.grad,
      title: estateData.naziv,
      description: estateData.description,
      price: estateData.cijena,
      imgLinks: [estateData.img_no1, estateData.img_no2].filter((img) => img), // Filter da uklonimo prazne linkove
      isAvailable: estateData.isAvailable,
    };

    return estate;
  } catch (error) {
    // Rukovanje greškom
    console.error("Greška prilikom dobijanja podataka o nekretnini:", error);
    throw error; // Prosleđujemo grešku da bi bila uhvaćena na višem nivou
  }
};

const getEstateByLocation = async (town: string) => {
  const data = await repository.getEstateByLocation(town);
  // console.log(data);
  const result: any[] = [];

  data.forEach((element: any) => {
    const estate: any = {
      id: Number(element.id),
      town: String(element.grad),
      title: String(element.naziv),
      description: String(element.description),
      price: Number(element.cijena),
      imgLinks: [],
      isAvailable: Number(element.isAvailable),
    };
    if (element.img_no1) {
      estate.imgLinks.push(element.img_no1);
    }
    if (element.img_no2) {
      estate.imgLinks.push(element.img_no2);
    }

    result.push(estate);
  });

  return result;
};

const getAllTowns = async () => {
  const data = await estateRepository.getAllTowns();
  const townData: string[] = [];
  data.forEach((estate: any) => {
    townData.push(estate["grad"]);
  });
  return townData;
};

export default {
  getAllEstates,
  getEstateById,
  getEstateByLocation,
  getAllTowns,
};
