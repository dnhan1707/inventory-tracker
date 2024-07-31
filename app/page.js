'use client'
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Stack, TextField, Typography, Button } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  // Fetch from database
  const updateInventory = async () => {
    const snapShot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapShot);
    const inventoryList = [];

    docs.forEach(doc => {
      inventoryList.push(
        {
          name: doc.id,
          ...doc.data()
        }
      )
    });
    setInventory(inventoryList);
  }

  const addItem = async (item) => {

    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  }

  const removeItem = async (name) => {
    const docRef = doc(collection(firestore, 'inventory'), name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h6">Add item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                console.log("Adding item:", itemName); // Debugging line
                addItem(itemName);
                setItemName('');
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1">Inventory management</Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
      >
        Add New item
      </Button>
      <Box mt={4}>
        {inventory.map((item, index) => (
          <Box key={index} display="flex" justifyContent="space-between" width="300px" mb={2}>
            <Typography>
              {item.name}
            </Typography>
            <Typography>
              {item.quantity}
            </Typography>
            <Button variant="outlined" color="secondary" onClick={() => addItem(item.name)}>
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => removeItem(item.name)}>
              Remove
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
