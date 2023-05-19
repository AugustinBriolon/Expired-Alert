import { useState, useEffect } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default function List() {

  const supabase: SupabaseClient = createClient(
    "https://gnnhbujkucxfrjklqryl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubmhidWprdWN4ZnJqa2xxcnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0ODQ1MDIsImV4cCI6MjAwMDA2MDUwMn0.yrhdYItkVhfS3zMoPYTHd19n_T4bz0vIpGUoQtQ1EM8"
  );

  const [items, setItems] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data: ShoppingList } = await supabase
        .from("ShoppingList")
        .select("*");
      setItems(ShoppingList ?? []);
    };
    fetchItems();
  }, [supabase]);
  

  return (
    <div className="List">
      <h1>Shopping List</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.expired_at}
          </li>
        ))}
      </ul>
    </div>
  );
}
