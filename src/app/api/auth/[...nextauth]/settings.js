import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/utils/DBConnect";
import { userModel } from "@/models/userModel";
import { checkPassword } from "@/utils/passwordCheck";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        try {
          const user = await userModel.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await checkPassword(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Incorrect Password.");
            }
          } else {
            return null;
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to the token after login
      if (user) {
        token.id = user.id;
        token.roleName = user.roleName;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the token user information to the session object
      if (token) {
        session.user.id = token.id;
        session.user.roleName = token.roleName;
        session.user.fullName = token.fullName;
      }
      return session;
    },
  },
};
