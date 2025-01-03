import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";

import { api } from '../../services/api';

import { Container, Form } from "./style";

export function NewNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks( prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert ("Note created successfully!")

    navigate("/");
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>New note</h1>
            <Link to="/">Return</Link>
          </header>

          <Input 
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <TextArea 
            placeholder="Annotation"
            onChange={e => setDescription(e.target.value)}  
          />

          <Section title="Links">
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)} 
                />  
              ))
            }
            <NoteItem 
              isNew 
              placeholder="New Link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink} 
            />
          </Section>

          <Section title="Markers">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)} 
                  />
                ))
              }

              <NoteItem 
                isNew 
                placeholder="New Tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Save"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}