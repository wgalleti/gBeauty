import React from "react";
import { Row } from "react-bootstrap";
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
      { dataField: "timeDuration", dataType: "number" },
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
        width: "60%",
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
          { dataField: "name", colSpan: 2, validationRules: [requiredField] },
          {
            dataField: "price",
            editorType: "dxNumberBox",
            editorOptions: {
              format: { type: "fixedPoint", precision: 2 },
            },
            validationRules: [requiredField],
          },
          {
            dataField: "timeDuration",
            editorType: "dxNumberBox",
            editorOptions: {
              format: { type: "fixedPoint", precision: 0 },
            },
            validationRules: [requiredField],
          },
        ],
      },
    },
  };

  return (
    <>
      <Row>
        <DataGrid dataSource={dataSource} {...gridOptions} />
      </Row>
    </>
  );
};

export default ServicePage;
