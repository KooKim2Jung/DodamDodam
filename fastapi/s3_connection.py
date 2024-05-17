from dotenv import load_dotenv
from fastapi import UploadFile, File, APIRouter
from fastapi.responses import JSONResponse

import os

import boto3
import magic


load_dotenv()

router = APIRouter(prefix="/test")

aws_access_key_id = os.getenv("AWS_S3_ACCESS_KEY")
aws_secret_access_key = os.getenv("AWS_S3_PRIVATE_KEY")

bucket_name = 'dodambuket'

s3_client = boto3.client(
    "s3",
    region_name="ap-northeast-2",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

def get_extension(mime_type):
    """MIME 타입에 따라 파일 확장자를 반환"""
    extension_map = {
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'audio/ogg': '.ogg',
        'audio/x-flac': '.flac',
        'audio/webm': '.webm',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/bmp': '.bmp',
        'image/svg+xml': '.svg',
        'image/webp': '.webp'
    }
    return extension_map.get(mime_type, '')

def upload_file_to_s3(file_stream, original_file_name):
    """파일 스트림과 원본 파일 이름을 받아 S3에 업로드하고 URL을 반환"""
    mime_type = magic.from_buffer(file_stream.read(2048), mime=True)
    file_stream.seek(0)  # 버퍼를 다시 파일의 시작점으로 이동

    extension = get_extension(mime_type)
    if not extension:
        raise ValueError("Unsupported file type")

    file_name = f"{original_file_name.rsplit('.', 1)[0]}{extension}"
    try:
        s3_client.upload_fileobj(
            file_stream,
            bucket_name,
            file_name,
            ExtraArgs={'ContentType': mime_type}
        )
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': file_name},
            ExpiresIn=3600  # 링크는 1시간 후 만료
        )
        return {"message": "File uploaded successfully", "url": url}
    except Exception as e:
        raise Exception(f"Error uploading file: {str(e)}")

@router.post("/upload_file/")
async def upload_endpoint(file: UploadFile = File(...)):
    try:
        result = upload_file_to_s3(file.file, file.filename)
        return result
    except Exception as e:
        return {"message": str(e)}

