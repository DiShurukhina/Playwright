interface ICases {
  testName: string;
  username: string;
  password: string;
  message: string;
}

export const invalidCredentialsCases: ICases[] = [
    {
      testName: "Username too short",
      username: "Di",
      password: "Password",
      message: "Username should contain at least 3 characters",
    },
    {
      testName: "Username too long",
      username: "u".repeat(41),
      password: "Password1",
      message: "Successfully registered! Please, click Back to return on login page",
    },
    {
      testName: "Username with spaces at the beginning",
      username: " user",
      password: "Password",
      message: "Prefix and postfix spaces are not allowed is username",
    },
    {
      testName: "Username with spaces at the end",
      username: "user ",
      password: "Password1",
      message: "Prefix and postfix spaces are not allowed is username",
    },
    {
      testName: "Username only spaces",
      username: "   ",
      password: "Password",
      message: "Prefix and postfix spaces are not allowed is username",
    },
    {
      testName: "Password too short",
      username: "ValidUser",
      password: "Pwd1",
      message: "Password should contain at least 8 characters",
    },
    {
      testName: "Password too long",
      username: "ValidUser",
      password: "A".repeat(21),
      message: "Successfully registered! Please, click Back to return on login page",
    },
    {
      testName: "Password without uppercase",
      username: "ValidUser",
      password: "password",
      message: "Password should contain at least one character in upper case",
    },
    {
      testName: "Password without lowercase",
      username: "ValidUser",
      password: "PASSWORD",
      message: "Password should contain at least one character in lower case",
    },
    {
      testName: "Password only spaces",
      username: "ValidUser",
      password: "        ",
      message: "Password is required",
    },
  ];