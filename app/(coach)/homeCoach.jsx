import React, { useState, useCallback } from "react";
import { View } from "react-native";
import CustomLayout from "../../components/CustomLayout";
import CustomBigButton from "../../components/CustomBigButton";
import {
  faChartSimple,
  faEye,
  faPlus,
  faPenToSquare,
  faTrash,
  faClipboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { router, useFocusEffect } from "expo-router";

function HomeCoach() {
  const [isDisabled, setIsDisabled] = useState({
    activitiesStats: false,
    takeAttendance: false,
    viewActivities: false,
    createActivity: false,
    editActivity: false,
    deleteActivity: false,
  });

  useFocusEffect(
    useCallback(() => {
      // Reset the disabled state when the screen gains focus
      setIsDisabled({
        activitiesStats: false,
        takeAttendance: false,
        viewActivities: false,
        createActivity: false,
        editActivity: false,
        deleteActivity: false,
      });
    }, [])
  );

  const handlePress = (buttonName, route) => {
    setIsDisabled((prevState) => ({
      ...prevState,
      [buttonName]: true,
    }));

    if (route) {
      router.push(route);
    }
  };

  return (
    <CustomLayout title="Home">
      <CustomBigButton
        text={"Activities statistics"}
        icon={faChartSimple}
        handlePress={() => handlePress("activitiesStats")}
        disabled={isDisabled.activitiesStats}
      />
      <CustomBigButton
        text={"Take attendance"}
        icon={faClipboardUser}
        handlePress={() =>
          handlePress("takeAttendance", "coachSubPages/takeAttendance")
        }
        disabled={isDisabled.takeAttendance}
      />
      <CustomBigButton
        text={"View activities"}
        icon={faEye}
        handlePress={() =>
          handlePress("viewActivities", "coachSubPages/viewActivites")
        }
        disabled={isDisabled.viewActivities}
      />
      <CustomBigButton
        text={"Create activity"}
        icon={faPlus}
        handlePress={() =>
          handlePress("createActivity", "coachSubPages/createActitivy")
        }
        disabled={isDisabled.createActivity}
      />
      <CustomBigButton
        text={"Edit activity"}
        icon={faPenToSquare}
        editActivity
        handlePress={() =>
          handlePress("createActivity", "coachSubPages/editActivityList")
        }
        disabled={isDisabled.editActivity}
      />
      <CustomBigButton
        text={"Delete activity"}
        icon={faTrash}
        handlePress={() =>
          handlePress("deleteActivity", "coachSubPages/deleteActivityList")
        }
        disabled={isDisabled.deleteActivity}
      />
    </CustomLayout>
  );
}

export default HomeCoach;
