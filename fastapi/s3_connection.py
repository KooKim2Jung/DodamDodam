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

print("AWS_ACCESS_KEY_ID:", os.getenv("AWS_ACCESS_KEY_ID"))
print("AWS_SECRET_ACCESS_KEY:", os.getenv("AWS_SECRET_ACCESS_KEY"))

s3_client = boto3.client(
    "s3",
    region_name="ap-northeast-2",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

bucket_name = 'dodambuket'  # 버킷 이름 설정

def get_extension(mime_type):
    # MIME 타입으로부터 확장자 결정
    # 필요에 따라 MIME 타입을 확장자 매핑으로 확장할 수 있음
    extension_map ={
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

@router.post("/upload-file/")
async def upload_file(file: UploadFile = File(...)):
    # 파일 MIME 타입 추출
    mime_type = magic.from_buffer(await file.read(2048), mime=True)
    # 파일 포인터를 초기 위치로 되돌림
    await file.seek(0)

    # 파일 확장자 결정
    extension = get_extension(mime_type)
    if not extension:
        return JSONResponse(status_code=400,
                            content={"message": "Unsupported file type"})

    # 파일 저장 위치와 이름 설정
    file_name = f"{file.filename.rsplit('.', 1)[0]}.{extension}"

    # S3에 파일 업로드
    try:
        s3_client.upload_fileobj(
            file.file,
            bucket_name,
            file_name,
            ExtraArgs={'ContentType': mime_type}
        )
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': file_name},
            ExpiresIn=3600  # Link expires in 1 hour
        )
        return {"message": "File uploaded successfully",
                "file_name": file_name,
                "url": url}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(router, host="0.0.0.0", port=8000)