import { Link } from "react-router-dom";
import { Space, Table, Typography, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  fullname: string;
  email: string;
  gender: string;
  updated: string;
  created: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "#",
    dataIndex: "no",
    key: "no",
    render: (_, record) => <p>{record.key}</p>,
  },
  {
    title: "Fullname",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Updated at",
    dataIndex: "updated",
    key: "updated",
  },
  {
    title: "Created at",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button
          onClick={() => alert(record.key)}
          style={{
            width: 25,
            height: 25,
            backgroundColor: "#FDD671",
            cursor: "pointer",
          }}
        >
          ...
        </button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    fullname: "John Brown",
    email: "johnbrown@mail.com",
    gender: "M",
    updated: "2014-12-24 20:35:00",
    created: "2014-12-24 20:35:00",
  },
  {
    key: "2",
    fullname: "Jim Green",
    email: "jimgreen@mail.com",
    gender: "F",
    updated: "2014-12-24 20:35:00",
    created: "2014-12-24 20:35:00",
  },
  {
    key: "3",
    fullname: "Joe Black",
    email: "joeblack@mail.com",
    gender: "F",
    updated: "2014-12-24 20:35:00",
    created: "2014-12-24 20:35:00",
  },
];

const List = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 10px 0px 10px",
        }}
      >
        <Typography.Title level={2}>Manage Admin</Typography.Title>
        <Link to={"/admin/add"}>
          <Button type="primary">Add Admin</Button>
        </Link>
      </div>
      <Table
        style={{ overflow: "scroll" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default List;
