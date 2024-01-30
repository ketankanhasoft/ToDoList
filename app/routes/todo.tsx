import * as React from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import Topbar from "~/components/topbar";
import Modal from "~/components/modal";
import DeleteModal from "~/components/modal/delete";
import DataGrid from "~/components/dataGrid";
import { Button } from "@mui/material";
import { useSubmit } from "@remix-run/react";
import { db } from "~/server/prisma.server";
import type { Prisma } from '@prisma/client';

// interfave to-do list
export interface TableData {
  title: string
  description: string
  status: number
  priority: string
  department: number
  assignee: number
  id?: number
}

// initial call
export const loader = async ({ request }: LoaderFunctionArgs) => {

  // Server side pagination
  // const url = new URL(request.url);
  // const page: number = parseInt(url.searchParams.get("page") || "0");
  // const limit: number = parseInt(url.searchParams.get("limit") || "10");

  const todoList = await db.todo_task.findMany({
    // skip: page,
    // take: limit
    orderBy: {
      id: 'desc',
    }
  })
  // return todo list
  return json({
    todos: todoList,
  });
};

// component
export default function Component() {
  const user = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [open, setOpen] = React.useState(false);
  const [actionData, setActionData] = React.useState<any>({});
  const [openDelete, setOpenDelete] = React.useState(false);

  // open add - edit popup
  const handleClickOpen = (data: any) => {
    setActionData(data.id ? data : {});
    setOpen(true);
  };

  // close add - edit popup
  const handleClose = () => {
    setOpen(false);
    setActionData({});
  };

  // save - update 
  const handleSubmit = (data: any) => {
    submit(
      { data },
      { method: data?.id ? "put" : "post", encType: "application/json" }
    );
    setOpen(false);
  };

  // delete open function
  const handleClickDeleteOpen = (data: any) => {
    setActionData(data);
    setOpenDelete(true);
  };

  // delete close function
  const handleClickDeleteClose = () => {
    setOpenDelete(false);
    setActionData({});
  };

  // delete function
  const handleSubmitDelete = () => {
    submit(
      { data: actionData },
      { method: "delete", encType: "application/json" }
    );
    setOpenDelete(false);
  };

  // return componenet
  return (
    <Form action="/todo" method="post">
      <Topbar />
      <div style={{display: "flex", justifyContent: "flex-end", paddingRight: "10px"}}>

      <Button variant="contained" onClick={handleClickOpen} sx={{ my: 4 }}>
        Add New Task
      </Button>
      </div>
      {open && (
        <Modal
          open={open}
          handleClose={handleClose}
          data={actionData}
          handleSubmit={handleSubmit}
        />
      )}
      {openDelete && (
        <DeleteModal
          open={openDelete}
          handleClose={handleClickDeleteClose}
          handleSubmit={handleSubmitDelete}
        />
      )}

      <DataGrid
        data={user.todos}
        handleClickOpen={handleClickOpen}
        handleClickDeleteOpen={handleClickDeleteOpen}
      />
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {

  let body = await request.json()
  let data: Prisma.Todo_taskCreateInput

  // insert new to-do list
  if (request.method === 'POST') {
    data = {
      title: body.data.title,
      description: body.data.description,
      status: body.data.status,
      priority: body.data.priority,
      department: body.data.department,
      assignee: body.data.assignee,
    }
    await db.todo_task.create({
      data: data,
    });

    // recall get api
    return redirect('/todo');
  }

  // insert update to-do list
  if (request.method === 'PUT') {
    const id = body.data.id;
    const data = {
      title: body.data.title,
      description: body.data.description,
      status: body.data.status,
      priority: body.data.priority,
      department: body.data.department,
      assignee: body.data.assignee
    }

    await db.todo_task.update({
      where: { id: parseInt(id as string, 10) },
      data,
    });

    // recall get api
    return redirect('/todo');
  }

  // insert delete to-do list
  if (request.method === 'DELETE') {
    const id = body.data.id

    await db.todo_task.delete({
      where: { id: parseInt(id as string, 10) },
    });

    // recall get api
    return redirect('/todo');
  }

  return json({ ok: true });
}
