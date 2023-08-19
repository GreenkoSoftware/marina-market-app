export async function authenticate({ email, password }) {
  var data = {
    user: {
    }, 
    statusCode: undefined,
    statusText: undefined,
    error: undefined,
    message: undefined
  }

  try {
    await fetch('https://marina-market-auth-api-c4pc-dev.fl0.io/auth/login',
      {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
          email: email || '',
          password: password || ''
        })
      })
      .then(response => {
        data.statusCode = response?.status
        data.statusText = response?.statusText
        try {
          return response.json()
        } catch{ 
           data.error = response?.statusText
          return undefined
        }
      }).then(response => {
        if (response?.code === 200) {
          const { token, user_type: userType, user: userData } = response.data
  
          data.user = {
            token,
            userType,
            name: userData?.name,
            lastName: userData?.last_name
          }
        } else {
          data.error = response?.messages
        }
        data.statusCode = response?.code
        data.message = response?.messages
      })
    return data
  } catch {
    return data
  }
}