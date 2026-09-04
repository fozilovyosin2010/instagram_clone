// here
export const useActionBtn = ({ name }: { name: string }) => {
  function removeToken() {}

  function action(str: string) {
    if (str === "Log out") removeToken();
  }
};
