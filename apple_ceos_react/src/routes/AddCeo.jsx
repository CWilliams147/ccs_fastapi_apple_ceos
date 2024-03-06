import { Form, redirect } from "react-router-dom";
import slugify from "slugify";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("ceoName");
  const slug = slugify(name, {
    replacement: "_",
    lower: true,
    strict: true,
  });
  const year = formData.get("ceoYear");

  // Format our data into JSON
  const data = { name, slug, year: Number(year) };

  // API POST route
  const url = "http://localhost:8000/create";

  // Setup fetch() to POST data...
  const AddCeo = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

  console.log("ADD CEO RESPONSE");

  return redirect("/ceos");
}

const AddCeo = () => {
  return (
    <Form method="post">
      <label>
        CEO Name
        <input type="text" name="ceoName" />
      </label>
      <label>
        Year Served
        <input type="number" name="ceoYear" min="1976" max="2100" />
      </label>
      <button type="submit">Add New CEO</button>
    </Form>
  );
};

export default AddCeo;
