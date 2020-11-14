import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Gweet = ({gweetObj,isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newGweet, setNewGweet] = useState(gweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure ypu want to delet this gweet?");
    if (ok) {
      await dbService.doc(`gweets/${gweetObj.id}`).delete();
      if(gweetObj.attachmentUrl !== "" ){
      await storageService.refFromURL(gweetObj.attachmentUrl).delete();
      }
      }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`gweets/${gweetObj.id}`).update({
      text: newGweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewGweet(value);
  };
  return (
    <div className="gweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="gweet">
            <input
              type="text"
              placeholder="Edit your gweet"
              value={newGweet}
              required
              onChange={onChange}
              className="factoryInput__input"
            />
            <input type="submit" value="Update gweet"  className="formBtn margin10"/>
            <span onClick={toggleEditing} className="formBtn cancelBtn">
              Cancel
            </span>
          </form>
          
        </>
      ) : (
        <>
          <h4>{gweetObj.name} &middot; {gweetObj.createdAt}</h4>
          <p>{gweetObj.text}</p>
          {gweetObj.attachmentUrl && <img src= {gweetObj.attachmentUrl} />}
          {isOwner && (
          <div class="gweet__actions">
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
          )}
        </>
      )}
    </div>
  );
}
export default Gweet;