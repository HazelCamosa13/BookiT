import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, Alert } from "react-native";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { validateNotEmpty } from "../utils/validator";

export default function NovelScreen() {
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [novels, setNovels] = useState([]);

  const fetchNovels = async () => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "novels"), where("userId", "==", auth.currentUser.uid));
    const snap = await getDocs(q);
    setNovels(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const addNovel = async () => {
    if (!validateNotEmpty(title)) return Alert.alert("Title required");
    await addDoc(collection(db, "novels"), {
      title,
      chapter,
      userId: auth.currentUser.uid,
      createdAt: new Date().toISOString()
    });
    setTitle("");
    setChapter("");
    fetchNovels();
  };

  const updateNovel = async (id) => {
    const ref = doc(db, "novels", id);
    await updateDoc(ref, { chapter: chapter || "Updated chapter", updatedAt: new Date().toISOString() });
    fetchNovels();
  };

  const deleteNovel = async (id) => {
    await deleteDoc(doc(db, "novels", id));
    fetchNovels();
  };

  useEffect(() => {
    fetchNovels();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 22 }}>📖 Manage Your Novels</Text>
      <TextInput placeholder="Novel Title" value={title} onChangeText={setTitle} style={{borderWidth:1,padding:8,marginVertical:8}} />
      <TextInput placeholder="Chapter" value={chapter} onChangeText={setChapter} style={{borderWidth:1,padding:8,marginVertical:8}} />
      <Button title="Add Novel" onPress={addNovel} />
      <FlatList
        style={{marginTop:20}}
        data={novels}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding:10, borderWidth:1, marginVertical:6 }}>
            <Text style={{ fontWeight: "bold", fontSize:16 }}>{item.title}</Text>
            <Text>Chapter: {item.chapter}</Text>
            <View style={{ flexDirection:"row", marginTop:6 }}>
              <Button title="Update" onPress={() => updateNovel(item.id)} />
              <View style={{ width:8 }} />
              <Button title="Delete" onPress={() => deleteNovel(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
