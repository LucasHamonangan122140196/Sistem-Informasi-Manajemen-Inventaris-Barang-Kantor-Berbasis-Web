from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from .meta import Base

class Kategori(Base):
    __tablename__ = 'kategori'
    id = Column(Integer, primary_key=True)
    nama = Column(String(100), nullable=False)
    deskripsi = Column(Text)

    barang = relationship("Barang", back_populates="kategori", cascade="all, delete", passive_deletes=True)

class Barang(Base):
    __tablename__ = 'barang'
    id = Column(Integer, primary_key=True)
    nama = Column(String(150), nullable=False)
    kategori_id = Column(Integer, ForeignKey('kategori.id', ondelete="RESTRICT"), nullable=False)
    jumlah = Column(Integer, nullable=False)
    kondisi = Column(String(50), nullable=False)
    tanggal_masuk = Column(Date, nullable=False)
    lokasi = Column(String(100), nullable=False)
    keterangan = Column(Text)

    kategori = relationship("Kategori", back_populates="barang")

    __table_args__ = (
        CheckConstraint("jumlah > 0", name="check_jumlah_positive"),
        CheckConstraint("kondisi IN ('Baik', 'Rusak Ringan', 'Rusak Berat')", name="check_kondisi_valid"),
    )