import React from "react";
import { Table as AntDesignTable } from "antd";
import useAntDataSource from "../../hooks/useAntDataSource";

export default function Table({
  data,
  columns,
  amountOfItems,
  page,
  limit,
  changePagination,
  ...props
}) {
  // const {dataSource} = useAntDataSource(data);

  // const columns = [
  //     {
  //       title: 'Name',
  //       dataIndex: 'name',
  //       key: 'name',
  //       render: (text) => <a href="/" >{text}</a>,
  //     },
  //     {
  //       title: 'Age',
  //       dataIndex: 'age',
  //       key: 'age',
  //     },
  //     {
  //       title: 'Address',
  //       dataIndex: 'address',
  //       key: 'address',
  //     },
  //     {
  //       title: 'Tags',
  //       key: 'tags',
  //       dataIndex: 'tags',
  //       render: (_, { tags }) => (
  //         <>
  //           {tags.map((tag) => {
  //             let color = tag.length > 5 ? 'geekblue' : 'green';

  //             if (tag === 'loser') {
  //               color = 'volcano';
  //             }

  //             return (
  //               <Tag color={color} key={tag}>
  //                 {tag.toUpperCase()}
  //               </Tag>
  //             );
  //           })}
  //         </>
  //       ),
  //     },
  //     {
  //       title: 'Action',
  //       key: 'action',
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <a>Invite {record.name}</a>
  //           <a>Delete</a>
  //         </Space>
  //       ),
  //     },
  //   ];

  return (
    <AntDesignTable
      columns={columns}
      dataSource={data}
      rowKey={(obj) => obj.id}
      pagination={{ total: amountOfItems, current: page, pageSize: limit }}
      onChange={changePagination}
      {...props}
    />
  );
}
