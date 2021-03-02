import { useState } from 'react'
import ImageUploader from 'react-images-upload'
import styled from 'styled-components'
import { useMutation, useQuery } from '@redwoodjs/web'

const HomePage = () => {
  const [uploadedPictures, setUploadedPictures] = useState([])
  const [create] = useMutation(CREATE_PICTURE)
  const { data } = useQuery(GET_PICTURE)

  const onDrop = (picture) => {
    setUploadedPictures([...uploadedPictures, picture])
  }

  const submitPictures = () => {
    uploadedPictures.map((picture) => {
      const reader = new FileReader()

      reader.readAsDataURL(picture[0])

      reader.onload = function () {
        const base64Url = reader.result

        create({ variables: { file: base64Url, file_name: picture[0].name } })
      }
    })
  }

  return (
    <>
      <h1>Put your pictures here.</h1>
      <p>This is important...</p>
      {uploadedPictures.length !== 0 && (
        <Button onClick={submitPictures}>Save your pictures now</Button>
      )}
      <Container>
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText="Choose images"
          onChange={(image) => onDrop(image)}
          singleImage={true}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={52428800}
        />
      </Container>
      <Flex>
        {data?.pictures &&
          data.pictures.map((picture) => <Img src={picture.file} />)}
      </Flex>
    </>
  )
}

const Button = styled.button`
  background-color: #34feac;
  padding: 10px 12px;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    background-color: rgba(52, 254, 172, 0.5)
  }
`

const Container = styled.div`
  margin: auto;
  width: 500px;
`

const Flex = styled.div`
  display: flex;
`

const Img = styled.img`
  padding: 24px;
  height: 200px;
  width: 200px;
`

const GET_PICTURE = gql`
  query {
    pictures {
      id
      file
      file_name
    }
  }
`
const CREATE_PICTURE = gql`
  mutation createPicture($file: String, $file_name: String) {
    createPicture(input: { file: $file, file_name: $file_name }) {
      id
      file_name
    }
  }
`

export default HomePage
