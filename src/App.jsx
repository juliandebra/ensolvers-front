import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Layout/PublicLayout";
import CreateNote from "./Pages/CreateNote";
import NoteDetail from "./Pages/NoteDetail";
import NoteList from "./Pages/NoteList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route element={<NoteList />}>
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/note/:id" element={<NoteDetail />} />
            <Route path="/editnote/:id" element={<CreateNote />} />
          </Route>
          <Route path="/notes" element={<NoteList />} />
          <Route path="/archive" element={<NoteList archived />}>
            <Route
              path="/archive/createnote"
              element={<CreateNote fromArchive />}
            />
            <Route path="/archive/:id" element={<NoteDetail fromArchive />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
