import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DeleteJobDiialogProps {
  openDialog: boolean;
  isDeleting: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

const ConfirmDialog = ({
  openDialog,
  handleCancelDelete,
  handleConfirmDelete,
  isDeleting,
}: DeleteJobDiialogProps) => {
  return (
    <Dialog open={openDialog} onClose={handleCancelDelete}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>Are you sure you want to delete this job?</DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
