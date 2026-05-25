import { prisma } from "./prisma.js"

export const normalSignUp = async(
    email:string,
    username:string,
    password:string,
  )=>{
    return await prisma.user.create({
        data:{email, username, password, name:username}
    })
}

export const getUserByEmailOrUsername = async (identifier:string)=>{
  return await prisma.user.findFirst({
    where:{
      OR:[
        {email: identifier},
        {username: identifier}
      ]
    },select:{
      id:true,
      username:true,
      password:true,
      email:true
    }
  })
}

export const isUsernameOrEmailTaken = async (identifier:string) => {
  const user = await prisma.user.findFirst({
    where:{
      OR:[
        {email: identifier},
        {username: identifier}
      ]
    },select:{id:true} //solo se necesit saber si existe, no hace fala mas datos
  });
  return user != null; // devuelve true si user o email existe y false si no
};

export const isEmailTaken = async (email:string) => {
  const userMail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return userMail != null; // devuelve true si email existe y false si no
};

// Obtener o crear usuario por Google
export const getOrCreateGoogleUser = async (
  googleId: string,
  email: string,
  displayName: string,
) => {
  // 1. Buscar usuario existente por googleId
  let user = await prisma.user.findUnique({
    where: { googleId },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      avatar_url: true,
    },
  });

  // 2. Si no existe por googleId, buscar por email
  if (!user) {
    user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        avatar_url: true,
      },
    });

    // 3. Si existe por email, actualizar googleId
    if (user) {      
      user = await prisma.user.update({
        where: { email },
        data: {
          googleId,
          auth_provider: "google",
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          avatar_url: true,
        },
      });
    } else {
      // 4. Si no existe, crear nuevo usuario
      // Generar username único basado en displayName
      let username = displayName.toLowerCase().replace(/\s+/g, "_");
      
      // Verificar que el username no esté tomado
      let counter = 1;
      let originalUsername = username;
      while (await isUsernameOrEmailTaken(username)) {
        username = `${originalUsername}_${counter}`;
        counter++;
      }

      // Usar la URL de Google directamente
      let avatarUrl = "https://res.cloudinary.com/dssbrks07/image/upload/v1771602464/avatars/d1ozknsuviqhqbjyx1z2.webp";

      user = await prisma.user.create({
        data: {
          googleId,
          email,
          username,
          name: displayName,
          avatar_url: avatarUrl,
          auth_provider: "google",
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          avatar_url: true,
        },
      });
    }
  }

  return user;
};



