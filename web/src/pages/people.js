import React from "react";
import { Col, Row } from "react-bootstrap";
import DataGrid from "devextreme-react/data-grid";
import People from "../api/people";

const requiredField = { type: "required", message: "This field is required" };

const peopleModel = new People();
const peopleTypes = peopleModel.peopleType();
const dataSource = peopleModel.makeCustomStore();

const PeoplePage = () => {
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
      { dataField: "firstName", caption: "First Name" },
      {
        dataField: "lastName",
        caption: "Last Name",
      },
      { dataField: "documentId", caption: "Document", dataType: "numeric" },
      { dataField: "email", caption: "Email" },
      {
        dataField: "peopleType",
        caption: "Type",
        lookup: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: peopleTypes,
        },
      },
      { dataField: "active", caption: "Active", dataType: "boolean" },
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
        title: "People Form",
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
          {
            dataField: "firstName",
            colSpan: 2,
            validationRules: [requiredField],
          },
          {
            dataField: "lastName",
            colSpan: 2,
            validationRules: [requiredField],
          },
          {
            dataField: "documentId",
            colSpan: 1,
            validationRules: [requiredField],
          },
          {
            dataField: "email",
            colSpan: 3,
            validationRules: [requiredField],
          },
          {
            dataField: "peopleType",
            colSpan: 2,
            validationRules: [requiredField],
          },
          { dataField: "active" },
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

export default PeoplePage;
