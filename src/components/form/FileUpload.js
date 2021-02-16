import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Avatar, Badge } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files)
    // resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);    
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to image[] in the parent component - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({...values, images: filteredImages})
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  };

  return (
    <Col>
      <Row>
        <label className="btn">
          <span>
            <UploadOutlined />
          </span>
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
          <span className="ml-2">Tải ảnh lên</span>
        </label>
      </Row>
      <Row>
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              className="mt-4 mr-4"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                shape="square"
                size={100}
                className="picture-product p-2"
              />
            </Badge>
          ))}
      </Row>
    </Col>
  );
};

export default FileUpload;
