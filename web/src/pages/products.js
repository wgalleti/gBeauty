import React from "react";
import { Row } from "react-bootstrap";
import DataGrid from "devextreme-react/data-grid";
import Product from "../api/product";
import ProductGroup from "../api/product.group";

const requiredField = { type: "required", message: "This field is required" };
const productGroupModel = new ProductGroup();
const productModel = new Product();
const dataSource = productModel.makeCustomStore();

const ProductPage = () => {
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
      {
        dataField: "group",
        lookup: {
          dataSource: productGroupModel.lookup(),
          displayExpr: "name",
          valueExpr: "id",
        },
      },
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
            validationRules: [requiredField],
            editorType: "dxNumberBox",
            editorOptions: {
              format: { type: "fixedPoint", precision: 2 },
            },
          },
          {
            dataField: "group",
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

export default ProductPage;
