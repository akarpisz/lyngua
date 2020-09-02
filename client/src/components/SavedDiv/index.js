import React from "react";
import Saved from "../pages/Saved";

const SavedDiv = ({ saved: { starFiltered, translations } }) => {
  return starFiltered ? <div /> : <div />;
};
export default SavedDiv;
