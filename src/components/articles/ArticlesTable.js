import React from "react";
import DataTable from "../common/tables/DataTable";
import Heading from "../common/Heading";
import DateFormatter from "../common/tables/DateFormatter";
import ArticleEditIconFormatter from "./ArticleEditIconFormatter";

const cols = [
  {
    key: "articleId",
    name: "",
    resizable: false,
    formatter: ArticleEditIconFormatter,
    width: 40,
    cellClass: "text-center"
  },
  { key: "title", name: "Title", resizable: true },
  { key: "subject", name: "Subject", resizable: true },
  { key: "datePosted", name: "Date Posted", formatter: DateFormatter, resizable: true, width: 200 },
  { key: "authorName", name: "Author" }
];

class ArticlesTable extends React.Component {
  render() {
    return (
      <div>
        <Heading>{this.props.title}</Heading>
        <div>
          <DataTable data={this.props.data} columns={cols} height={500} />
        </div>
      </div>
    );
  }
}

export default ArticlesTable;
