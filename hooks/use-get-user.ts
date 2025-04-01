import { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import { findUser } from "@/app/actions";

const useGetUser = (userId: string) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const user = await findUser(userId);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading };
};

export default useGetUser;
