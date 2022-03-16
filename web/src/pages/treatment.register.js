import React from "react";
import { Form } from "devextreme-react";
import DataGrid, { MasterDetail } from "devextreme-react/data-grid";
import { Row } from "react-bootstrap";
import notify from "devextreme/ui/notify";
import Treatment from "../api/treatment";
import People from "../api/people";
import TreatmentItemPage from "./treatment.item";
import styles from "./treatment.register.module.css";

const treatmentModel = new Treatment({ status: 1 });
const peopleModel = new People();
const dataSource = {
  store: treatmentModel.makeCustomStore(),
  sort: { selector: "id", desc: true },
};

const requiredField = { type: "required", message: "This field is required" };

const TreatmentRegisterPage = () => {
  const [formInstance, setFormInstance] = React.useState();
  const [items, setItems] = React.useState(0);
  let grid;
  const formData = React.useMemo(() => ({}), []);

  const gridRefresh = React.useCallback(() => {
    if (grid) {
      grid.refresh();
    }
  }, [grid]);

  React.useEffect(() => {
    if (items !== 0) gridRefresh();
  }, [items, gridRefresh]);

  const options = React.useMemo(
    () => ({
      width: "100%",
      labelLocation: "top",
      showColonAfterLabel: false,
      showValidationSummary: true,
      scrollingEnabled: true,
      focusStateEnabled: true,
      colCount: 5,
      items: [
        {
          colSpan: 2,
          dataField: "professional",
          editorType: "dxLookup",
          editorOptions: {
            dropDownOptions: {
              closeOnOutsideClick: true,
              showTitle: false,
            },
            searchEnabled: false,
            showCancelButton: false,
            dataSource: peopleModel.lookup(0),
            displayExpr: "fullName",
            valueExpr: "id",
          },
          validationRules: [requiredField],
        },
        {
          colSpan: 2,
          dataField: "customer",
          editorType: "dxLookup",
          editorOptions: {
            dropDownOptions: {
              closeOnOutsideClick: true,
              showTitle: false,
            },
            searchEnabled: false,
            showCancelButton: false,
            dataSource: peopleModel.lookup(1),
            displayExpr: "fullName",
            valueExpr: "id",
          },
          validationRules: [requiredField],
        },
        {
          itemType: "button",
          buttonOptions: {
            icon: "check",
            useSubmitBehavior: true,
            elementAttr: {
              class: "btn-register",
            },
            async onClick(e) {},
          },
          colSpan: 1,
          horizontalAlignment: "right",
          verticalAlignment: "bottom",
        },
      ],
      onContentReady: ({ component }) => {
        setFormInstance(component);
      },
    }),
    []
  );

  const formSubmitHandler = React.useCallback(
    async (e) => {
      e.preventDefault();
      try {
        formData.date = Date.parse(formData.date);
        const data = { ...formData };
        await treatmentModel.save(null, data);
        formInstance.resetValues();

        setItems((v) => v + 1);

        notify(
          {
            message: "Treatment register successfuly",
            position: {
              my: "center top",
              at: "center top",
            },
          },
          "success",
          5000
        );
      } catch (e) {
        console.error(e);
      }
    },
    [formData, formInstance]
  );

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
        {
          widget: "dxButton",
          location: "before",
          options: {
            icon: "check",
            hint: "Finish",
            onClick: () => {
              grid.refresh();
            },
          },
        },
      ],
    },
    columns: [
      { dataField: "date", dataType: "date" },
      {
        dataField: "professional",
        lookup: {
          displayExpr: "fullName",
          valueExpr: "id",
          dataSource: peopleModel.lookup(0),
        },
      },
      {
        dataField: "customer",
        lookup: {
          displayExpr: "fullName",
          valueExpr: "id",
          dataSource: peopleModel.lookup(1),
        },
      },
      { dataField: "duration" },
      {
        dataField: "status",
        lookup: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: treatmentModel.statusDetail(),
        },
      },
      {
        dataField: "cost",
        dataType: "number",
        format: { type: "fixedPoint", precision: 2 },
      },
      {
        dataField: "value",
        dataType: "number",
        format: { type: "fixedPoint", precision: 2 },
      },
      {
        dataField: "tip",
        dataType: "number",
        format: { type: "fixedPoint", precision: 2 },
      },
    ],
    searchPanel: {
      visible: true,
    },
    editing: {
      allowAdding: false,
      allowUpdating: false,
      allowDeleting: false,
      useIcons: true,
      mode: "popup",
      popup: {
        height: "auto",
        width: "60%",
        showTitle: true,
        title: "Treatment Form",
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
        items: [],
      },
    },
    selection: {
      mode: "single",
    },
    onSelectionChanged: function (e) {
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
    },
  };

  function renderDetail(props) {
    return <TreatmentItemPage {...props} setItems={setItems} />;
  }

  return (
    <>
      <Row>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <Form formData={formData} {...options} />
        </form>
      </Row>
      <Row>
        <DataGrid dataSource={dataSource} {...gridOptions}>
          <MasterDetail enabled={false} render={renderDetail}></MasterDetail>
        </DataGrid>
      </Row>
    </>
  );
};

export default TreatmentRegisterPage;
