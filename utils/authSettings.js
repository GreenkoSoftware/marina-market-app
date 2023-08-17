import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      type: 'credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'password', type: 'password' }
      },
      async authorize (credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { name: 'Greenko', email: 'greenko.software@gmail.com', token: undefined, userType: undefined }

        const loggin = await fetch('https://marina-market-auth-api-c4pc-dev.fl0.io/auth/login',
          {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({
              email: 'greenko.software@gmail.com',
              password: 'eraenradianes.1'
            })
          })
          .then(response => {
            console.log(response)
            return response.json()
          }).then(response => {
            if (response?.code === 200) {
              const { token, user_type: userType } = response.data
              user.token = token
              user.userType = userType
            }
            console.log(response)
            return true
          })

        if (loggin) {
          return user
        } else {
          return null
        }

      /*   if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        } */
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect ({ url, baseUrl }) {
      return baseUrl
    },
    async session ({ session, user, token }) {
      return session
    },
    async jwt ({ token, user, account, profile, isNewUser }) {
      return token
    }
  }
}
