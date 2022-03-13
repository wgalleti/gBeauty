import React from "react";
import { Col, Row } from "react-bootstrap";
import DataGrid from "devextreme-react/data-grid";
import Service from "../api/service";

const requiredField = { type: "required", message: "This field is required" };
const serviceModel = new Service();
const dataSource = serviceModel.makeCustomStore();

const ServicePage = () => {
  let grid;

  const gridOptions = {
    onContentReady: (e) => {
      grid = e.component;
    },
    toolbar: {
      items: [
        "searchPanel",
        "addRowButton",
        {
          widget: "dxButton",
          location: "before",
          options: {
            icon: "refresh",
            onClick: () => {
              grid.refresh();
            },
          },
        },
      ],
    },
    columns: [
      { dataField: "id", caption: "#" },
      { dataField: "name" },
      { dataField: "price", dataType: "number" },
      { dataField: "duration" },
    ],
    searchPanel: {
      visible: true,
    },
    editing: {
      allowAdding: true,
      allowUpdating: true,
      allowDeleting: true,
      useIcons: true,
      mode: "popup",
      popup: {
        height: "auto",
        width: "80%",
        showTitle: true,
        title: "Services Form",
        shadingColor: "rgba(0,0,0, 0.7)",
      },
      form: {
        focusStateEnabled: true,
        hoverStateEnabled: true,
        activeStateEnabled: true,
        scrollingEnabled: true,
        tabIndex: 0,
        labelLocation: "top",
        showColonAfterLabel: false,
        showValidationSummary: false,
        colCount: 4,
        items: [
          { dataField: "name" },
          { dataField: "price" },
          { dataField: "duration" },
        ],
      },
    },
  };
  return (
    <>
      <Row>
        <Col md={2}>Filtros</Col>
        <Col>
          <DataGrid dataSource={dataSource} {...gridOptions} />
        </Col>
      </Row>
    </>
  );
};

export default ServicePage;
