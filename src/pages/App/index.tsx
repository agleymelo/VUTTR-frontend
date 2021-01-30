/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'

import { yupResolver } from '@hookform/resolvers/yup'

import CloseIcon from '../../assets/svg/Icon-Close-2px.svg'
import CloseIconBlack from '../../assets/svg/Icon-Close-Black.svg'
import IconSpinner from '../../assets/svg/IconSpinner.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Navbar from '../../components/Navbar'
import TextArea from '../../components/TextArea'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import {
  Container,
  Content,
  ContentMiddle,
  ContaineSearch,
  ButtonAdd,
  ContentModal,
  Form,
  ContainerCard,
  ContentCard,
  ContentHeader,
  Loading,
  ContentModalButtons,
  ButtonRemoveTool,
  TitleModal
} from './styles'
import schemaValidationCreateNewTools from './validation'

Modal.setAppElement('#root')

interface IForInputs {
  title: string
  link: string
  description?: string
  tags: string
}

interface IToolData {
  id: string
  user_id: string
  title: string
  link: string
  description: string
  tags: string[]
}

interface IResponseData {
  data: IToolData[]
}

const App: React.FC = () => {
  const { register, errors, handleSubmit, reset, getValues } = useForm<IForInputs>({
    resolver: yupResolver(schemaValidationCreateNewTools)
  })

  const { addToast } = useToast()

  const [modalCreate, setModalCreate] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalRemove, setModalRemove] = useState(false)
  const [loading, setLoading] = useState(true)

  const [responseData, setResponseData] = useState<IResponseData>({} as IResponseData)

  const [selectedTool, setSelectedTool] = useState<IToolData>({} as IToolData)

  useEffect(() => {
    setLoading(true)

    api
      .get('tools')
      .then(response => {
        setResponseData(response)

        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const refreshTool = useCallback(() => {
    setLoading(true)

    api
      .get('tools')
      .then(response => {
        setResponseData(response)

        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const onHandleCreateModal = useCallback(() => {
    reset({
      title: '',
      link: '',
      description: '',
      tags: ''
    })

    setModalCreate(true)
  }, [reset])

  const onSubmitCreateTool = useCallback(
    data => {
      const formattedData = {
        ...data,
        tags: data.tags.split(' ')
      }

      api
        .post('/tools', formattedData)
        .then(response => {
          if (response.status === 201) {
            addToast({
              type: 'success',
              title: 'Create Tool',
              description: `${data.title} tool created`
            })

            refreshTool()
          }
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Error',
            description: `${data.title} already exists`
          })
        })
      setModalCreate(false)
    },
    [addToast, setModalCreate]
  )

  const onHandleUpdateModal = useCallback(
    (tool: IToolData) => {
      setModalUpdate(true)

      setSelectedTool(tool)

      reset({
        title: tool.title,
        link: tool.link,
        description: tool.description,
        tags: tool.tags.join(' ')
      })
    },
    [reset, setModalUpdate, setSelectedTool]
  )

  const onHandleUpdateTool = useCallback(() => {
    setLoading(true)

    const data = getValues(['title', 'link', 'description', 'tags'])

    const formattedData = {
      ...data,
      tags: data?.tags?.split(' ')
    }

    api
      .put(`tools/${selectedTool.id}`, formattedData)
      .then(response => {
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'Update Tool',
            description: `${formattedData.title} tool updated`
          })

          refreshTool()
        } else if (response.status === 404) {
          addToast({
            type: 'error',
            title: 'Error',
            description: `${formattedData.title} already exists`
          })
        }
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Failed to update your tool',
          description: 'Check the fields and try again'
        })
      })

    setLoading(false)
    setModalUpdate(false)
  }, [selectedTool, addToast, refreshTool])

  const onHandleRemoveModal = useCallback((tool: IToolData) => {
    if (modalUpdate) setModalUpdate(false)

    setModalRemove(true)

    setSelectedTool(tool)
  }, [])

  const onHandleRemoveTool = useCallback(() => {
    setLoading(true)

    api
      .delete(`tools/${selectedTool.id}`)
      .then(response => {
        if (response.status === 204) {
          addToast({
            type: 'success',
            title: 'Remove tool'
          })

          refreshTool()
        }
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'An error occurred, please try again'
        })
      })

    setLoading(false)
    setModalRemove(false)
  }, [addToast, selectedTool, refreshTool])

  const onHandleSearchForTag = useCallback(event => {
    if (event.target.value) {
      setLoading(true)

      const tag = event.target.value

      api
        .get(`tools?tag=${tag}`)
        .then(response => {
          setResponseData(response)

          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      refreshTool()
    }
  }, [])

  return (
    <Container>
      <Navbar />

      <Content>
        <h1>VUTTR</h1>

        <h2>Very Useful Tools to Remember</h2>
      </Content>

      <ContentMiddle>
        <ContaineSearch>
          <Input onBlur={onHandleSearchForTag} name="search" type="text" placeholder="Search by Tags" onFocus={() => false} />
        </ContaineSearch>
        <ButtonAdd type="button" onClick={onHandleCreateModal}>
          + Add new Tool
        </ButtonAdd>
      </ContentMiddle>

      {/* Modal Create Tool */}
      <Modal
        isOpen={modalCreate}
        onRequestClose={() => setModalCreate(false)}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        style={{
          overlay: { backgroundColor: '#000000a9' },
          content: { width: '650px', height: '650px', margin: 'auto', padding: '20px', borderRadius: '12px' }
        }}
      >
        <ContentModal>
          <div className="header">
            <h3>+ Add new Tool</h3>

            <Button onClick={() => setModalCreate(false)}>
              <img src={CloseIconBlack} alt="" />
            </Button>
          </div>
        </ContentModal>

        <Form onSubmit={handleSubmit(onSubmitCreateTool)}>
          <p>Title</p>
          <Input
            register={register}
            error={errors.title?.message}
            name="title"
            type="text"
            onFocus={() => false}
            onBlur={() => false}
          />

          <p>Link</p>
          <Input
            register={register}
            error={errors.link?.message}
            name="link"
            type="text"
            onFocus={() => false}
            onBlur={() => false}
          />

          <p>Description</p>
          <TextArea register={register} error={errors.description?.message} name="description" />

          <p>Tags</p>
          <Input
            register={register}
            error={errors.tags?.message}
            name="tags"
            type="text"
            onFocus={() => false}
            onBlur={() => false}
          />

          <Button type="submit">Create Tool</Button>
        </Form>
      </Modal>

      {/* Modal Update Tool */}
      <Modal
        isOpen={modalUpdate}
        onRequestClose={() => setModalUpdate(false)}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        style={{
          overlay: { backgroundColor: '#000000a9' },
          content: { width: '650px', height: '650px', margin: 'auto', padding: '20px', borderRadius: '12px' }
        }}
      >
        <ContentModal>
          <div className="header">
            <h3>Update tool</h3>

            <Button onClick={() => setModalUpdate(false)}>
              <img src={CloseIconBlack} alt="" />
            </Button>
          </div>
        </ContentModal>

        <Form>
          <p>Title</p>
          <Input
            register={register}
            error={errors.title?.message}
            name="title"
            type="text"
            onFocus={() => false}
            onBlur={() => false}
          />

          <p>Link</p>
          <Input
            register={register}
            error={errors.link?.message}
            name="link"
            type="text"
            onFocus={() => false}
            onBlur={() => false}
          />

          <p>Description</p>
          <TextArea register={register} error={errors.description?.message} name="description" />

          <p>Tags</p>
          <Input
            register={register}
            error={errors.tags?.message}
            name="tags"
            type="text"
            onFocus={() => false}
            onBlur={() => false}
          />

          <ContentModalButtons>
            <Button onClick={onHandleUpdateTool}>Update Tool</Button>

            <ButtonRemoveTool
              onClick={() => {
                setModalUpdate(false)
                setModalRemove(true)
              }}
            >
              Remove Tool
            </ButtonRemoveTool>
          </ContentModalButtons>
        </Form>
      </Modal>

      {/* Modal Remove Tool */}
      <Modal
        isOpen={modalRemove}
        onRequestClose={() => setModalRemove(false)}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        style={{
          overlay: { backgroundColor: '#000000a9' },
          content: { width: '400px', height: '230px', margin: 'auto', padding: '20px', borderRadius: '12px' }
        }}
      >
        <ContentModal>
          <div className="header">
            <h3>Remove Tool</h3>

            <Button onClick={() => setModalRemove(false)}>
              <img src={CloseIconBlack} alt="" />
            </Button>
          </div>
        </ContentModal>

        <TitleModal>Are you sure you want to remove?</TitleModal>

        <ContentModalButtons>
          <Button onClick={() => setModalRemove(false)}>Cancel</Button>

          <ButtonRemoveTool type="button" onClick={onHandleRemoveTool}>
            Yes, Remove
          </ButtonRemoveTool>
        </ContentModalButtons>
      </Modal>

      {!loading ? (
        responseData?.data.map(tool => (
          <ContainerCard key={tool.id}>
            <ContentCard>
              <ContentHeader>
                <div onClick={() => onHandleUpdateModal(tool)}>
                  <h1 className="title">{tool.title}</h1>
                </div>
                <Button onClick={() => onHandleRemoveModal(tool)}>
                  <img src={CloseIcon} alt="" />
                </Button>
              </ContentHeader>

              <a href={tool.link} rel="noopener noreferrer" target="_blank">
                {tool.link}
              </a>

              <div className="footer" onClick={() => onHandleUpdateModal(tool)}>
                <p>{tool.description}</p>
                <>
                  {tool.tags.map(tag => (
                    <span key={tag}>{`#${tag}`}</span>
                  ))}
                </>
              </div>
            </ContentCard>
          </ContainerCard>
        ))
      ) : (
          <Loading>
            <img src={IconSpinner} alt="" />
          </Loading>
        )}
    </Container>
  )
}

export default App
