import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// -------------------------------
// RANDOM DATE (LAST 30 DAYS)
// -------------------------------
function randomDateLast30Days() {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - 30);

  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime()),
  );
}

// -------------------------------
// USERS DATASET (50 REALISTIC USERS)
// -------------------------------

const users = [
  // =========================
  // 🇪🇸 SPANISH USERS (30)
  // =========================

  {
    username: "Gianni",
    name: "Gianni Gabriel Clondireanu",
    email: "giannigabriel0@gmail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779840760/avatars/sa1ojmgx7rv7xm9vxy5f.webp",
    banner_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1780262845/banners/necdpldkuttohp6gn91k.webp",
    language: "es",
  },
  {
    username: "OnlyCats_1",
    name: "OnlyCats",
    email: "cats@gmail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1780262504/avatars/u6ft6ln1gewdwizrlbta.webp",
    banner_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1780262674/drtllxicxr9ohwzjv9iw.webp",
    language: "es",
  },
  {
    username: "alexdev",
    name: "Alex García",
    email: "alex.dev@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/jojo-bizarre-adventure-jojo_s-bizarre-adventure_wplfc6.webp",
    language: "es",
    bio: "Me gusta viajar, la tecnología y los proyectos creativos 🚀",
  },
  {
    username: "mariacodes",
    name: "María López",
    email: "maria.lopez@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/pexels-alvarobalderas-33680700_xg7z9y.webp",
    language: "es",
    bio: "Amante del diseño, la música y el café ☕",
  },
  {
    username: "javierweb",
    name: "Javier Martín",
    email: "javier.martin@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841156/pexels-puneet-sehgal-939247793-20058561_wce0oh.webp",
    language: "es",
    bio: "Fan del deporte y la productividad diaria.",
  },
  {
    username: "lauradev",
    name: "Laura Sánchez",
    email: "laura.sanchez@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841156/pexels-myatezhny39-2992517_irmtp8.webp",
    language: "es",
    bio: "Estudiante, soñadora y adicta a la música indie 🎧",
  },
  {
    username: "danielux",
    name: "Daniel Ruiz",
    email: "daniel.ruiz@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/images_1_uglrmv.webp",
    language: "es",
    bio: "Apasionado del cine, los videojuegos y la tecnología.",
  },
  {
    username: "sofiacode",
    name: "Sofía Fernández",
    email: "sofia.fernandez@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841156/pexels-walter-alejandro-228509595-31246118_kthxqa.webp",
    language: "es",
    bio: "Me encanta la moda, el diseño y las redes sociales 💅",
  },
  {
    username: "carlosp",
    name: "Carlos Pérez",
    email: "carlos.perez@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841156/pexels-sirmudi_photography-2155088036-34485313_x40gcf.webp",
    language: "es",
    bio: "Deportista amateur y amante de la comida italiana 🍝",
  },
  {
    username: "elenadev",
    name: "Elena Gómez",
    email: "elena.gomez@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/pexels-brotmanphotography-32026049_gntbuw.webp",
    language: "es",
    bio: "Fotografía, viajes y atardeceres 🌅",
  },
  {
    username: "migueljs",
    name: "Miguel Torres",
    email: "miguel.torres@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/images_bdwv5u.webp",
    language: "es",
    bio: "Gamer de noche, estudiante de día 🎮",
  },
  {
    username: "luciaweb",
    name: "Lucía Navarro",
    email: "lucia.navarro@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841156/pexels-teodorapopa-15502152_uc1hsi.webp",
    language: "es",
    bio: "Viajando por el mundo cuando puedo ✈️",
  },

  {
    username: "ivancode",
    name: "Iván Morales",
    email: "ivan.morales@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841155/pexels-kyi-htetlinn-2160738647-37219539_a0dg9k.webp",
    language: "es",
    bio: "Amante del fútbol y los fines de semana tranquilos.",
  },
  {
    username: "paulaux",
    name: "Paula Romero",
    email: "paula.romero@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/noFilter_kh001i.webp",
    language: "es",
    bio: "Café, libros y música lo-fi 📚",
  },
  {
    username: "sergiodev",
    name: "Sergio Díaz",
    email: "sergio.diaz@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841158/81fd4561cb8acd9ffd1503a76f3559e9_oyy5lq.webp",
    language: "es",
    bio: "Fitness, disciplina y vida sana 💪",
  },
  {
    username: "nuriacode",
    name: "Nuria Castillo",
    email: "nuria.castillo@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841154/pexels-guillermo-berlin-1524368912-28686633_nd0xrj.webp",
    language: "es",
    bio: "Creativa, curiosa y un poco soñadora.",
  },
  {
    username: "adriweb",
    name: "Adrián Vega",
    email: "adrian.vega@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841154/pexels-chandu-j-s-272679776-12858175_pucmtg.webp",
    language: "es",
    bio: "Siempre buscando la próxima aventura 🌍",
  },

  {
    username: "alvarojs",
    name: "Álvaro Serrano",
    email: "alvaro.serrano@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779840180/avatars/d2hlx68dg7uqtqtdxlfz.webp",
    language: "es",
    bio: "Fan de los videojuegos y el deporte competitivo 🎮",
  },
  {
    username: "martacode",
    name: "Marta Jiménez",
    email: "marta.jimenez@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779839879/avatars/fjfxuavctmr4xko29pjy.webp",
    language: "es",
    bio: "Diseño, creatividad y redes sociales 💡",
  },
  {
    username: "jorgeux",
    name: "Jorge Blanco",
    email: "jorge.blanco@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841154/pexels-imshaamim-17719703_q2ydry.webp",
    language: "es",
    bio: "Amante del mar y la fotografía 📸",
  },
  {
    username: "andreadev",
    name: "Andrea Molina",
    email: "andrea.molina@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841154/pexels-david-romero-1032440377-20354812_ttkdnv.webp",
    language: "es",
    bio: "Viajes, música y buena comida 🍕",
  },
  {
    username: "davidweb",
    name: "David Ramos",
    email: "david.ramos@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779835900/FDCTHJiX0AEAUc2_nnfqk5.webp",
    language: "es",
    bio: "Deporte y vida saludable 💪",
  },

  {
    username: "criscode",
    name: "Cristina Vega",
    email: "cristina.vega@mail.com",
    avatar_url:
"https://res.cloudinary.com/dssbrks07/image/upload/v1779841155/pexels-md-shamim-shariar-sakil-1954441149-34192054_mwmacg.webp",
    language: "es",
    bio: "Apasionada de la lectura y el cine 🎬",
  },
  {
    username: "alejandroweb",
    name: "Alejandro Santos",
    email: "alejandro.santos@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841157/1f52990bb4207a32bd0236d0d613e5e7_ebgpee.webp",
    language: "es",
    bio: "Tecnología y música electrónica 🎧",
  },
  {
    username: "beacodes",
    name: "Beatriz Ortega",
    email: "beatriz.ortega@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841157/thumb-1920-292742_oggbcs.webp",
    language: "es",
    bio: "Arte, diseño y creatividad 🎨",
  },
  {
    username: "pablodev",
    name: "Pablo Ruiz",
    email: "pablo.ruiz@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841158/anyone-who-had-this-profile-picture-is-now-in-jail-v0-gvm09w6xm3w41_vxdvx8.webp",
    language: "es",
    bio: "Fútbol, amigos y tecnología ⚽",
  },
  {
    username: "luisjs",
    name: "Luis Herrera",
    email: "luis.herrera@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841157/03b1741898a290614e04d8210202b4ef_c0narb.webp",
    language: "es",
    bio: "Gaming y café ☕🎮",
  },

  {
    username: "eloyweb",
    name: "Eloy Campos",
    email: "eloy.campos@mail.com",
    language: "es",
    bio: "Amante del cine y la música indie 🎬",
  },
  {
    username: "irisdev",
    name: "Iris Muñoz",
    email: "iris.munoz@mail.com",
    language: "es",
    bio: "Naturaleza, viajes y fotografía 🌿",
  },
  {
    username: "raulux",
    name: "Raúl Ortega",
    email: "raul.ortega@mail.com",
    language: "es",
    bio: "Fitness y vida sana 💪",
  },
  {
    username: "noacode",
    name: "Noa Díaz",
    email: "noa.diaz@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841155/pexels-jimmyelizarraras-20788840_wziec8.webp",
    language: "es",
    bio: "Creatividad y redes sociales ✨",
  },
  {
    username: "victorweb",
    name: "Víctor Alonso",
    email: "victor.alonso@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/Captura_de_pantalla_2026-05-27_014730_eqqdg3.webp",
    language: "es",
    bio: "Deporte, tecnología y amigos ⚽",
  },

  // =========================
  // 🇬🇧 ENGLISH USERS (15)
  // =========================

  {
    username: "johndev",
    name: "John Smith",
    email: "john.smith@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/d2cf804032610d77f3aa2f0d385e7b35_dorbke.webp",
    language: "en",
    bio: "Coffee lover, traveler, and sports enthusiast ☕",
  },
  {
    username: "emmacode",
    name: "Emma Johnson",
    email: "emma.johnson@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/ec2444709b5a937bbf8aba01ad1d52ae_njwpyi.webp",
    language: "en",
    bio: "Bookworm 📚 | Music addict | Nature lover 🌿",
  },
  {
    username: "michaeljs",
    name: "Michael Brown",
    email: "michael.brown@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/cdeed224195349f98fb82bd2871f8144_1716145712_tplv-tiktokx-origin_ksberi.webp",
    language: "en",
    bio: "Gaming, gym and good food 🍔",
  },
  {
    username: "sophiadev",
    name: "Sophia Wilson",
    email: "sophia.wilson@mail.com",
    language: "en",
    bio: "Fashion, travel and photography ✈️",
  },
  {
    username: "danieluxen",
    name: "Daniel Taylor",
    email: "daniel.taylor@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841158/Captura_de_pantalla_2025-08-10_152927_ps4rtx.webp",
    language: "en",
    bio: "Football fan and movie addict 🎬",
  },

  {
    username: "oliviacode",
    name: "Olivia Anderson",
    email: "olivia.anderson@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841157/thumb-350-365031_pd7zfa.webp",
    language: "en",
    bio: "Coffee, sunsets and long walks 🌅",
  },
  {
    username: "williamweb",
    name: "William Thomas",
    email: "william.thomas@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841156/pexels-yasin-ali-abir-1142917-37580515_hl0bgk.webp",
    language: "en",
    bio: "Tech enthusiast who loves cooking 🍳",
  },
  {
    username: "lucasdev",
    name: "Lucas Jackson",
    email: "lucas.jackson@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841159/pexels-brotmanphotography-32026049_gntbuw.webp",
    language: "en",
    bio: "Music is life 🎧 | Always on the move",
  },
  {
    username: "harryjs",
    name: "Harry White",
    email: "harry.white@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841158/best-anime-pfp-jjk-2.jpg_y0dasu.webp",
    language: "en",
    bio: "Gym, games and weekends with friends 💪",
  },
  {
    username: "charlotteux",
    name: "Charlotte Harris",
    email: "charlotte.harris@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779835900/FDCTHJiX0AEAUc2_nnfqk5.webp",
    language: "en",
    bio: "Art, design and cozy evenings ✨",
  },

  {
    username: "jamescode",
    name: "James Martin",
    email: "james.martin@mail.com",
    language: "en",
    avatar_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779841155/pexels-jose-leon-2149817406-30805229_zudgcj.webp",
    bio: "Reading, travel and good coffee ☕",
  },
  {
    username: "ameliaweb",
    name: "Amelia Thompson",
    email: "amelia.thompson@mail.com",
    language: "en",
    bio: "Music, fashion and creative work 🎨",
  },
  {
    username: "benjaminjs",
    name: "Benjamin Lee",
    email: "benjamin.lee@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841155/pexels-joennguyen-10634613_n8oa4s.webp",
    language: "en",
    bio: "Sports and technology enthusiast ⚽",
  },
  {
    username: "miaxdev",
    name: "Mia Clark",
    email: "mia.clark@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779842507/e83adaaef8a50e459426d7d3c28b3947_n09hvy.webp",
    language: "en",
    bio: "Photography and travel ✈️📸",
  },
  {
    username: "ethanux",
    name: "Ethan Lewis",
    email: "ethan.lewis@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841158/best-anime-pfp-jjk-2.jpg_y0dasu.webp",
    language: "en",
    bio: "Gaming and tech lover 🎮",
  },

  // =========================
  // 🇫🇷 FRENCH USERS (5)
  // =========================

  {
    username: "lucdevfr",
    name: "Lucas Martin",
    email: "lucas.martin@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779841157/64d781cce1601f9fd91aec34dcaf5b31_qsaddv.webp",
    language: "fr",
    bio: "Passionné de cinéma et de voyages ✈️",
  },
  {
    username: "emmafr",
    name: "Emma Dubois",
    email: "emma.dubois@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779842507/e83adaaef8a50e459426d7d3c28b3947_n09hvy.webp",
    language: "fr",
    bio: "Mode, musique et café ☕",
  },
  {
    username: "noahfr",
    name: "Noah Bernard",
    email: "noah.bernard@mail.com",
    language: "fr",
    avatar_url:"https://res.cloudinary.com/dssbrks07/image/upload/v1779841157/30ee819bea201a1f043cf9431955ef21_o1dpw6.webp",
    bio: "Sport, amis et bonnes vibes ⚽",
  },
  {
    username: "leacodefr",
    name: "Léa Petit",
    email: "lea.petit@mail.com",
    language: "fr",
    bio: "Photographie et créativité 🎨",
  },
  {
    username: "juleswebfr",
    name: "Jules Robert",
    email: "jules.robert@mail.com",
    avatar_url:
      "https://res.cloudinary.com/dssbrks07/image/upload/v1779842507/0790098e6c8e4dc646bbc99a07acb827_r4sq90.webp",
    language: "fr",
    bio: "Gaming et musique électronique 🎧",
  },
];

// -------------------------------
// POSTS DATASET (~100 POSTS)
// Añadir al seed.ts existente, dentro de main() después de crear los usuarios
// -------------------------------

// Usuarios sin posts (inactivos): eloyweb, irisdev, raulux, noacode, victorweb, luisjs, harryjs, ameliaweb

type PostSeed = {
  username: string;
  content?: string;
  media_url?: string | null;
  language?: string | null;
  sentiment?: "positivo" | "neutral" | "negativo";
};

const posts: PostSeed[] = [
  // ─── alexdev ────────────────────────────────────────────────────────────
  { username: "alexdev", content: "Acabo de terminar mi proyecto personal con React + TypeScript. La combinación es brutal 🚀 ¿Alguien más obsesionado con el tipado estático?", media_url: null, language: "es", sentiment: "positivo" },
  { username: "alexdev", content: "Bangkok en 3 días: templos, street food y caos en las calles. No me arrepiento de nada 🌏", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835898/damnoen-mercado-700x467_f3k8ho.webp", language: "es", sentiment: "positivo" },
  { username: "alexdev", content: "He probado Cursor AI para programar y no voy a volver atrás. Dios mío.", media_url: null, language: "es", sentiment: "positivo" },
  { username: "alexdev", content: "Tres semanas intentando arreglar un bug en producción que resultó ser una coma mal puesta. Estoy bien.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── OnlyCats ────────────────────────────────────────────────────────────
  { username: "OnlyCats_1", media_url: "https://res.cloudinary.com/dssbrks07/video/upload/v1780263450/media/sdxs46yhn6ihrwxjo2rk.mp4"},
  { username: "OnlyCats_1", content: "Beautifull cat with homophobia 🩵💚", media_url: "https://res.cloudinary.com/dssbrks07/video/upload/v1780263478/media/ugxr4nmysvbqjunj3c7k.mp4", language: "en", sentiment: "positivo" },
  { username: "OnlyCats_1", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1780263440/media/nhijeemghk5fu8rr7hns.jpg"},
  { username: "OnlyCats_1", media_url: "https://res.cloudinary.com/dssbrks07/video/upload/v1780263525/media/gga4ykvkiaa4i8hj4syk.mp4"},

  // ─── mariacodes ─────────────────────────────────────────────────────────
  { username: "mariacodes", content: "Rediseñé la app de un cliente esta semana. El antes y después es bastante impresionante 😍", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837353/post101_home-screen_uecwry.webp", language: "es", sentiment: "positivo" },
  { username: "mariacodes", content: "Lunes sin café no es lunes. Es un error del universo ☕", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835899/FDCTHJiX0AEAUc2_nnfqk5.webp", language: "es", sentiment: "neutral" },
  { username: "mariacodes", content: "Descubriendo a The Strokes esta semana. ¿Cómo no los conocía antes? 🎵", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837410/1900x1900-000000-80-0-0_fyoosq.webp", language: "es", sentiment: "positivo" },

  // ─── javierweb ──────────────────────────────────────────────────────────
  { username: "javierweb", content: "Cambié un poco de ruta y se me ocurrió correr con silueta nueva. Muy por debajo de mi carrera de la semana pasada, pero se cumplió. 💪", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835900/FpVq1wnakAAV4nC_ynyg8g.webp", language: "es", sentiment: "neutral" },
  { username: "javierweb", content: "La técnica Pomodoro lleva una semana funcionándome perfectamente. ¿Alguien más la usa?", media_url: null, language: "es", sentiment: "positivo" },
  { username: "javierweb", content: "Entrené 6 días seguidos y hoy el cuerpo me pide descanso. Cuerpo: 1, ego: 0.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── lauradev ───────────────────────────────────────────────────────────
  { username: "lauradev", content: "Arctic Monkeys en bucle desde las 8 de la mañana y sin intención de parar 🎧", media_url: null, language: "es", sentiment: "positivo" },
  { username: "lauradev", content: "Primer día de exámenes. Que alguien me explique por qué estudié todo menos lo que cayó 😭", media_url: null, language: "es", sentiment: "negativo" },
  { username: "lauradev", content: "Tarde de lluvia + playlist lo-fi + libros = el plan perfecto 📚", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835900/HGy0iInaYAAEr_V_ewqfvh.webp", language: "es", sentiment: "positivo" },
  { username: "lauradev", content: "Este semestre ha sido el más duro de mi carrera. Pero lo estoy superando. Poco a poco.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── danielux ───────────────────────────────────────────────────────────
  { username: "danielux", content: "Terminé Elden Ring. Han sido 120 horas de pura tortura hermosa 🎮", media_url: null, language: "es", sentiment: "positivo" },
  { username: "danielux", content: "Dune Parte 2 es una de las mejores películas de la última década. No hay debate.", media_url: null, language: "es", sentiment: "positivo" },

  // ─── sofiacode ──────────────────────────────────────────────────────────
  { username: "sofiacode", content: "Look de hoy: minimalista pero con ese toque que lo dice todo 💅", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837408/6da55d8c2e1351637d747130a3a4521a_nkzz4q.webp", language: "es", sentiment: "positivo" },
  { username: "sofiacode", content: "Zara ha sacado colección nueva y mi cuenta bancaria ya tiene miedo 😅", media_url: null, language: "es", sentiment: "neutral" },
  { username: "sofiacode", content: "Llevaba meses sin publicar y no tengo excusa. Aquí vuelvo con todo ✨", media_url: null, language: "es", sentiment: "positivo" },

  // ─── carlosp ────────────────────────────────────────────────────────────
  { username: "carlosp", content: "Partido del domingo: ganamos 3-1. Metí dos goles. No voy a ser humilde hoy ⚽", media_url: null, language: "es", sentiment: "positivo" },
  { username: "carlosp", content: "La carbonara que hice anoche debería ser ilegal de lo buena que estaba 🍝", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835901/images_umounl.webp", language: "es", sentiment: "positivo" },
  { username: "carlosp", content: "Lesión en el tobillo. Mínimo 3 semanas sin entrenar. Esto es lo peor que me ha pasado este mes.", media_url: null, language: "es", sentiment: "negativo" },

  // ─── elenadev ───────────────────────────────────────────────────────────
  { username: "elenadev", content: "Atardecer en las Islas Cíes. No hay filtro, así es la realidad 🌅", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837407/0c38c330f2b3563cd6bba5678443a48c_ddx1kw.webp", language: "es", sentiment: "positivo" },
  { username: "elenadev", content: "Compré una cámara analógica de segunda mano y estoy obsesionada con el proceso 📷", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835903/pentax-17-camara-analogica-carrete-05-1024x683_x6epgz.webp", language: "es", sentiment: "positivo" },
  { username: "elenadev", content: "Marruecos en abril: los colores, los olores, la gente. Necesito volver 🌍", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835898/coloridas-macetas-sobre-pared-azul-y-escalones-chefchaouen-marruecos-TAMF02682_sfdquj.webp", language: "es", sentiment: "positivo" },

  // ─── migueljs ───────────────────────────────────────────────────────────
  { username: "migueljs", content: "Noche de examen a las 8. Decisión ejecutiva: una hora más de League of Legends.", media_url: null, language: "es", sentiment: "neutral" },
  { username: "migueljs", content: "Alcancé Diamante en ranked. 3 años de sufrimiento condensados en este momento 🎮", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837406/Screenshot_3-1_lbrfyd.webp", language: "es", sentiment: "positivo" },
  { username: "migueljs", content: "La universidad está bien pero nadie te avisa de que los mates de segundo van completamente en serio.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── luciaweb ───────────────────────────────────────────────────────────
  { username: "luciaweb", content: "Tokio en 10 días. Tengo el itinerario, el seguro, el alojamiento... y cero japonés aprendido 😅", media_url: null, language: "es", sentiment: "neutral" },
  { username: "luciaweb", content: "Vista desde el Machu Picchu a las 6am. Sin palabras. Solo gratitud 🏔️", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835898/depositphotos_115176328-stock-photo-machu-picchu-sunrise_bjees4.webp", language: "es", sentiment: "positivo" },
  { username: "luciaweb", content: "Viaje en tren por Europa: el mejor modo de moverse sin prisa y con vistas 🚂", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837410/484858590_1032180222276849_4743139915790828320_n_yksqzj.webp", language: "es", sentiment: "positivo" },

  // ─── ivancode ───────────────────────────────────────────────────────────
  { username: "ivancode", content: "El Madrid clasifica y Twitter arde. Noche especial ⚽🔥", media_url: null, language: "es", sentiment: "positivo" },
  { username: "ivancode", content: "Finde tranquilo: sofá, manta y el partido del domingo. La vida es simple y está bien así.", media_url: null, language: "es", sentiment: "positivo" },

  // ─── paulaux ────────────────────────────────────────────────────────────
  { username: "paulaux", content: "Terminé 'El nombre del viento' en tres días. Ahora tengo un vacío existencial 📚", media_url: null, language: "es", sentiment: "neutral" },
  { username: "paulaux", content: "Las lecturas de enero: 4 libros. Mal mes para mí, pero mejor que nada 📖", media_url: null, language: "es", sentiment: "neutral" },

  // ─── sergiodev ──────────────────────────────────────────────────────────
  { username: "sergiodev", content: "La dieta es el 80% del resultado. La gente no lo quiere escuchar pero es la verdad.", media_url: null, language: "es", sentiment: "neutral" },
  { username: "sergiodev", content: "Semana horrible de sueño y se notó en el gym. El descanso no es opcional, es parte del entreno.", media_url: null, language: "es", sentiment: "negativo" },

  // ─── nuriacode ──────────────────────────────────────────────────────────
  { username: "nuriacode", content: "No sé qué quiero hacer con mi vida pero sé que tiene que ser algo creativo. Con eso me quedo.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── adriweb ────────────────────────────────────────────────────────────
  { username: "adriweb", content: "Semana de trekking por los Pirineos. Sin señal, sin WiFi, sin excusas 🏔️", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835903/Pass-Aran-1024x768-1_ckiyua.webp", language: "es", sentiment: "positivo" },
  { username: "adriweb", content: "La próxima aventura: Islandia en febrero. Sí, en febrero. Sí, soy consciente del frío.", media_url: null, language: "es", sentiment: "positivo" },

  // ─── alvarojs ───────────────────────────────────────────────────────────
  { username: "alvarojs", content: "El EA Sports FC sigue siendo exactamente igual de frustrante que el FIFA con otro nombre 😂", media_url: null, language: "es", sentiment: "neutral" },
  { username: "alvarojs", content: "El Barça-Madrid de esta semana: 2h de puro teatro. Totalmente necesario.", media_url: null, language: "es", sentiment: "positivo" },

  // ─── martacode ──────────────────────────────────────────────────────────
  { username: "martacode", content: "La IA generativa está cambiando el diseño gráfico más rápido de lo que la mayoría pensaba.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── andreadev ──────────────────────────────────────────────────────────
  { username: "andreadev", content: "Roma en un finde: comer bien, caminar mucho y perderme sin mapa. Perfecto 🍕", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835904/pizza-recien-salida-horno_1122-11406_qea4eu.webp", language: "es", sentiment: "positivo" },
  { username: "andreadev", content: "Playlist de viaje terminada. Cada viaje merece su propia banda sonora 🎵", media_url: null, language: "es", sentiment: "positivo" },

  // ─── davidweb ───────────────────────────────────────────────────────────
  { username: "davidweb", content: "La mejor inversión que hice fue una buena zapatilla de correr. Las rodillas me lo agradecen.", media_url: null, language: "es", sentiment: "positivo" },

  // ─── criscode ───────────────────────────────────────────────────────────
  { username: "criscode", content: "Oppenheimer es un mierda de película. No entiendo el hype ni la crítica positiva. Me aburrió muchísimo.", media_url: null, language: "es", sentiment: "negativo" },
  { username: "criscode", content: "Fui a la Feria del Libro a comprar la Biografía de Cepeda y terminé con otro montón de libros y mi papá se llevó el de Cepeda 😅😭", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835900/HGy0iInaYAAEr_V_ewqfvh.webp", language: "es", sentiment: "positivo" },

  // ─── alejandroweb ───────────────────────────────────────────────────────
  { username: "alejandroweb", content: "Bicep en directo el mes pasado: dos horas de música electrónica perfecta 🎧", media_url: null, language: "es", sentiment: "positivo" },
  { username: "alejandroweb", content: "Monté mi primer homelab con Raspberry Pi. Rabbit hole de 3 fines de semana. Sin arrepentimientos.", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835902/my-first-homelab-with-a-raspberry-pi-v0-hx7i3p3qe8tg1_aoucel.webp", language: "es", sentiment: "positivo" },

  // ─── beacodes ───────────────────────────────────────────────────────────
  { username: "beacodes", content: "El proceso creativo es 90% bloqueo y 10% inspiración que llega a las 2am. Siempre.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── pablodev ───────────────────────────────────────────────────────────
  { username: "pablodev", content: "El Atleti eliminado otra vez en Champions. Todos los años igual 😤", media_url: null, language: "es", sentiment: "negativo" },
  { username: "pablodev", content: "Primer proyecto en producción. Hito roto. Ahora a arreglar los bugs que nadie vio en staging.", media_url: null, language: "es", sentiment: "neutral" },

  // ─── luisjs ─────────────────────────────────────────────────────────────
  { username: "luisjs", content: "Llevo 3 días con Cyberpunk 2077 y olvidé que existía el mundo real 🎮", media_url: null, language: "es", sentiment: "positivo" },

  // ─── johndev ────────────────────────────────────────────────────────────
  { username: "johndev", content: "Just landed in Lisbon. First impression: the hills are real, the pastéis are even better 🇵🇹", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835902/Lisbon-Mateigaria-pasteis-de-nata_bux42j.webp", language: "en", sentiment: "positivo" },
  { username: "johndev", content: "Three cups of coffee and I still couldn't focus. Maybe I should try sleeping for once.", media_url: null, language: "en", sentiment: "neutral" },

  // ─── emmacode ───────────────────────────────────────────────────────────
  { username: "emmacode", content: "Finished 'A Little Life' last night. I need a full week to recover emotionally 📚", media_url: null, language: "en", sentiment: "neutral" },
  { username: "emmacode", content: "Morning hike, no phone. The trees don't need wifi and neither did I today 🌿", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837409/19e19eb37a30889d77017b160522c057_uqcl4m.webp", language: "en", sentiment: "positivo" },
  { username: "emmacode", content: "New playlist: 2 hours of indie folk for rainy days. You're welcome 🎧", media_url: null, language: "en", sentiment: "positivo" },

  // ─── michaeljs ──────────────────────────────────────────────────────────
  { username: "michaeljs", content: "PR on bench press today. Two years of consistency finally paying off 💪", media_url: null, language: "en", sentiment: "positivo" },
  { username: "michaeljs", content: "Wuchang: Fallen Feathers is a pretty game, loving these environments! I m getting major Black Myth Wukong vibes from the setting and aesthetic!", media_url: "https://res.cloudinary.com/dssbrks07/video/upload/v1779837944/ssstwitter.com_1779831968453_vigkch.mp4", language: "en", sentiment: "positivo" },
  { username: "michaeljs", content: "Tried making smash burgers at home. Never going back to fast food 🍔", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779837407/WE_07.27.23_Double_Smash_Burger_svxrfc.webp", language: "en", sentiment: "positivo" },

  // ─── danieluxen ─────────────────────────────────────────────────────────
  { username: "danieluxen", content: "That ending in The Bear Season 3 was absolutely brutal. Why do I keep doing this to myself 🎬", media_url: null, language: "en", sentiment: "neutral" },
  { username: "danieluxen", content: "Champions League night. Nothing better. Absolutely nothing.", media_url: null, language: "en", sentiment: "positivo" },

  // ─── oliviacode ─────────────────────────────────────────────────────────
  { username: "oliviacode", content: "Working from a café today. The vibe is immaculate, the wifi is absolutely tragic ☕", media_url: null, language: "en", sentiment: "neutral" },

  // ─── lucasdev ───────────────────────────────────────────────────────────
  { username: "lucasdev", content: "Fred again.. live show was everything I hoped for and more 🎧", media_url: null, language: "en", sentiment: "positivo" },
  { username: "lucasdev", content: "3 cities in 5 days for work. Surviving on airport sandwiches and Spotify 🎵", media_url: null, language: "en", sentiment: "neutral" },

  // ─── jamescode ──────────────────────────────────────────────────────────
  { username: "jamescode", content: "Two weeks in Southeast Asia. Best decision of this year, not even close ✈️", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835897/beautiful-sunrise-jatiluwih-rice-terraces-bali-indonesia_620810-1699_lfvcee.webp", language: "en", sentiment: "positivo" },
  { username: "jamescode", content: "Re-reading 'Sapiens' for the second time. Still blows my mind every chapter.", media_url: null, language: "en", sentiment: "positivo" },

  // ─── benjaminjs ─────────────────────────────────────────────────────────
  { username: "benjaminjs", content: "Marathon training week 12. Long runs are getting longer, confidence with them 🏃", media_url: null, language: "en", sentiment: "positivo" },
  { username: "benjaminjs", content: "Apple Vision Pro impressions after a week: impressive tech, not sure it's worth it yet.", media_url: null, language: "en", sentiment: "neutral" },

  // ─── ethanux ────────────────────────────────────────────────────────────
  { username: "ethanux", content: "Just finished building my new PC. Six months of saving. Zero regrets 🖥️", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835899/F756E98F-62D4-40A6-8810-ECF063CA1B29_zy5cgr.webp", language: "en", sentiment: "positivo" },
  { username: "ethanux", content: "Helldivers 2 is the most fun I've had gaming in years. Someone pry it from my hands.", media_url: null, language: "en", sentiment: "positivo" },

  // ─── lucdevfr ───────────────────────────────────────────────────────────
  { username: "lucdevfr", content: "'Anatomy of a Fall' est probablement le meilleur film français de ces dix dernières années 🎬", media_url: null, language: "fr", sentiment: "positivo" },
  { username: "lucdevfr", content: "Week-end à Porto. La ville est magnifique, le vin encore meilleur 🍷", media_url: "https://res.cloudinary.com/dssbrks07/image/upload/v1779835901/istockphoto-2171810922-612x612_ex61gy.webp", language: "fr", sentiment: "positivo" },

  // ─── emmafr ─────────────────────────────────────────────────────────────
  { username: "emmafr", content: "Shopping d'hiver terminé. Mon portefeuille pleure mais mes tenues sont vraiment au niveau 👗", media_url: null, language: "fr", sentiment: "neutral" },

  // ─── noahfr ─────────────────────────────────────────────────────────────
  { username: "noahfr", content: "Match de foot avec les gars ce dimanche. On a perdu 2-0 mais l'ambiance était vraiment top ⚽", media_url: null, language: "fr", sentiment: "neutral" },

  // ─── leacodefr ──────────────────────────────────────────────────────────
  { username: "leacodefr", content: "Journée créative : argentique, carnet de croquis et zéro écran. Le luxe absolu 🎨", media_url: null, language: "fr", sentiment: "positivo" },

  // ─── juleswebfr ─────────────────────────────────────────────────────────
  { username: "juleswebfr", content: "Soirée Boiler Room en stream. Trois heures de techno berlinoise. Merci internet 🎧", media_url: null, language: "fr", sentiment: "positivo" },
  { username: "juleswebfr", content: "Fini Cyberpunk 2077 avec toutes les fins. 200h de ma vie. Aucun regret. 🎮", media_url: null, language: "fr", sentiment: "positivo" },
];
// -------------------------------
// GHOST USERS — faker-generated (likes, follows, reposts only)
// -------------------------------

function generateGhostUsers(count: number) {
  const langs = ["es", "en", "fr"] as const;
  const usedUsernames = new Set<string>();
  const usedEmails = new Set<string>();
  const result = [];

  while (result.length < count) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet
      .username({ firstName, lastName })
      .slice(0, 20)
      .replace(/[^a-zA-Z0-9_]/g, "_");
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    if (usedUsernames.has(username) || usedEmails.has(email)) continue;
    usedUsernames.add(username);
    usedEmails.add(email);

    result.push({
      username,
      name: `${firstName} ${lastName}`,
      email,
      language: langs[Math.floor(Math.random() * langs.length)],
    });
  }

  return result;
}

// -------------------------------
// HELPERS
// -------------------------------

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chance(prob: number) {
  return Math.random() < prob;
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// -------------------------------
// DATA (TEMPLATES)
// -------------------------------

const commentTemplates = [
  "Totalmente de acuerdo 🔥",
  "Muy cierto la verdad",
  "No lo había pensado así 🤔",
  "Buen punto, tiene sentido",
  "Esto da para pensar",
  "Qué buen post 👏",
  "La verdad es que sí",
  "Muy real todo esto",
  "Estoy bastante de acuerdo",
  "Buenísima reflexión 💭",
  "No puedo estar más de acuerdo",
  "Tiene mucho sentido lo que dices",
  "Esto me representa bastante 😂",
  "Gran punto de vista",
  "Muy interesante la verdad",
  "Qué bueno leer algo así",
  "Uf, esto es demasiado real 😅",
  "Buen aporte 🙌",
  "Hay mucha verdad aquí",
  "Esto me hizo pensar un poco",
  "Literalmente sí 😭",
  "Qué buena perspectiva",
  "Muy buen análisis 👀",
  "Esto merece más atención",
  "No todo el mundo está listo para esta conversación 😂",
  "Interesante forma de verlo",
  "Muy buena publicación 🔥",
  "Tienes razón en eso",
  "Me gustó este punto de vista",
  "Sinceramente, opino parecido",
  "No esperaba encontrarme con esto hoy",
  "Muy necesario decir esto",
  "Esto conecta bastante conmigo",
  "Qué cierto todo",
  "Buen contenido 👏",
  "La verdad es que da para reflexionar",
  "Muy top este post 🔥",
  "Tiene bastante lógica",
  "Buenísimo esto 😮",
  "Muy de acuerdo con gran parte de esto",
  "Esto estuvo interesante de leer",
  "Gran reflexión 👏",
  "No sé por qué pero esto me llegó",
  "Esto explica muchas cosas 😅",
  "Buen tema para debatir",
  "Muy buena energía en este post ✨",
  "Qué bueno encontrar contenido así",
  "Interesante, nunca lo había visto de esa manera",
  "Hay algo de razón aquí 👀",
  "Esto estuvo bastante acertado",
];

// -------------------------------
// LIKE GENERATION
// -------------------------------

async function generateLikes() {
  console.log("❤️ Generating likes...");

  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();

  for (const post of posts) {
    const r = Math.random();

    const type = r > 0.85 ? "viral" : r > 0.4 ? "normal" : "dead";

    const maxLikes = type === "viral" ? 40 : type === "normal" ? 15 : 5;

    const shuffledUsers = shuffle(users);

    const likeCount = Math.floor(Math.random() * maxLikes);

    for (let i = 0; i < likeCount; i++) {
      const user = shuffledUsers[i];
      if (!user) continue;

      try {
        await prisma.like.create({
          data: {
            user_id: user.id,
            post_id: post.id,
          },
        });
      } catch (err) {
        console.error("like error:", err);
      }
    }
  }
}

// -------------------------------
// COMMENTS (REALISTIC)
// -------------------------------

async function generateComments() {
  console.log("💬 Generating comments...");
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany({ include: { user: true } });

  for (const post of posts) {
    if (Math.random() < 0.35) continue;

    const commentCount = Math.floor(Math.random() * 6);
    const shuffledUsers = shuffle(users);

    for (let i = 0; i < commentCount; i++) {
      const user = shuffledUsers[i];
      if (!user) continue;

      const isReplyStyle = chance(0.3);

      const content = isReplyStyle
        ? `@${post.user.username} ${pick(commentTemplates)}`
        : pick(commentTemplates);

      try {
        await prisma.post.create({
          data: {
            user_id: user.id,
            parent_post_id: post.id,
            content,
            language: "es", // assuming comments are in Spanish for simplicity
            created_at: new Date(
              Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
            ),
          },
        });
      } catch (err) {
        console.error("comment error:", err);
      }
    }
  }
}

// -------------------------------
// REPOSTS
// -------------------------------

async function generateReposts() {
  console.log("🔁 Generating reposts...");

  const users = await prisma.user.findMany();

  // 👇 SOLO POSTS ORIGINALES (NO comentarios)
  const posts = await prisma.post.findMany({
    where: {
      parent_post_id: null,
    },
  });

  for (const post of posts) {
    if (Math.random() > 0.35) continue;

    const repostCount = Math.floor(Math.random() * 8);
    const shuffledUsers = [...users].sort(() => Math.random() - 0.5);

    for (let i = 0; i < repostCount; i++) {
      const user = shuffledUsers[i];
      if (!user) continue;

      try {
        await prisma.repost.create({
          data: {
            user_id: user.id,
            post_id: post.id,
          },
        });
      } catch (err) {
        console.error("repost error:", err);
      }
    }
  }
}

// -------------------------------
// Follows (REALISTIC, GIANNI-CENTRIC)
// -------------------------------
async function generateFollows() {
  console.log("👥 Generating follows...");
  const users = await prisma.user.findMany();

  const gianniUser = users.find((u) => u.username.toLowerCase() === "gianni");

  if (!gianniUser) {
    console.log("⚠️ User 'Gianni' not found");
    return;
  }

  for (const user of users) {
    // Every user follows Gianni
    if (user.id !== gianniUser.id) {
      try {
        await prisma.follow.create({
          data: {
            follower_id: user.id,
            following_id: gianniUser.id,
          },
        });
      } catch (err) {
        console.error(`follow→Gianni error for ${user.username}:`, err);
      }
    }

    // Each user also randomly follows 3–20 other users
    const followCount = Math.floor(Math.random() * 18) + 3;
    const shuffledUsers = shuffle(users);
    let created = 0;

    for (const candidate of shuffledUsers) {
      if (candidate.id === user.id) continue;
      if (candidate.id === gianniUser.id) continue; // already followed above
      if (created >= followCount) break;

      try {
        await prisma.follow.create({
          data: {
            follower_id: user.id,
            following_id: candidate.id,
          },
        });
        created++;
      } catch {
        // skip duplicate
      }
    }
  }

  console.log("✅ Follows generated");
}

// -------------------------------
// SEED EXECUTION
// -------------------------------

async function main() {
  console.log("🧹 Cleaning users...");

  await prisma.user.deleteMany();

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Notification",
      "Translation",
      "Repost",
      "Like",
      "Follow",
      "Post",
      "User"
    RESTART IDENTITY CASCADE;
  `);

  console.log("✅ Database cleaned");

  console.log("👤 Inserting users...");

  for (const u of users) {
    await prisma.user.create({
      data: {
        username: u.username,
        email: u.email,
        name: u.name,
        avatar_url:
          u.avatar_url ||
          "https://res.cloudinary.com/dssbrks07/image/upload/v1779846157/avatars/yikglrxc0loced4am32q.webp",
        banner_url:
          u.banner_url ||
          "https://res.cloudinary.com/dssbrks07/image/upload/v1779907744/banners/h20lgxtyjlyzk8vahev6.webp",
        language: u.language,
        bio: u.bio,
        password: process.env.PASSWORD_ALL_USERS,
        created_at: randomDateLast30Days(),
      },
    });
  }

  console.log(`✅ Seed completed: ${users.length} users created`);
  // ─── Inserción de posts en main() ────────────────────────────────────────────
  // Añade esto dentro de main(), justo después de la sección de usuarios:

  console.log("📝 Inserting posts...");

  for (const p of posts) {
    const user = await prisma.user.findUnique({
      where: { username: p.username },
    });
    if (!user) {
      console.warn(`⚠️  User not found: ${p.username}`);
      continue;
    }

    await prisma.post.create({
      data: {
        user_id: user.id,
        content: p.content,
        media_url: p.media_url,
        language: p.language,
        sentiment: p.content ? (p.sentiment ?? null) : null,
        created_at: randomDateLast30Days(),
      },
    });
  }

  console.log("👻 Inserting ghost users...");
  const ghostUsers = generateGhostUsers(50);
  for (const u of ghostUsers) {
    await prisma.user.create({
      data: {
        username: u.username,
        email: u.email,
        name: u.name,
        avatar_url:
          "https://res.cloudinary.com/dssbrks07/image/upload/v1779846157/avatars/yikglrxc0loced4am32q.webp",
        language: u.language,
        password: process.env.PASSWORD_ALL_USERS,
        created_at: randomDateLast30Days(),
      },
    });
  }
  console.log(`✅ Ghost users created: ${ghostUsers.length}`);

  console.log("🚀 Starting interactions seed...");

  await generateLikes();
  await generateComments();
  await generateReposts();
  await generateFollows();

  console.log("✅ Interactions seed completed");
  console.log(`✅ Posts completed: ${posts.length} posts created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
