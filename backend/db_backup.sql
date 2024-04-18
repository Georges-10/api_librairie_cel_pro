PGDMP                         |         	   librairie    15.1    15.1 #               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16444 	   librairie    DATABASE     |   CREATE DATABASE librairie WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.utf8';
    DROP DATABASE librairie;
                postgres    false            �            1259    16470    basket    TABLE     q   CREATE TABLE public.basket (
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    quantity integer
);
    DROP TABLE public.basket;
       public         heap    postgres    false            �            1259    16469    basket_book_id_seq    SEQUENCE     �   CREATE SEQUENCE public.basket_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.basket_book_id_seq;
       public          postgres    false    220                       0    0    basket_book_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.basket_book_id_seq OWNED BY public.basket.book_id;
          public          postgres    false    219            �            1259    16468    basket_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.basket_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.basket_user_id_seq;
       public          postgres    false    220                       0    0    basket_user_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.basket_user_id_seq OWNED BY public.basket.user_id;
          public          postgres    false    218            �            1259    16446    books    TABLE     �   CREATE TABLE public.books (
    id integer NOT NULL,
    titre character varying NOT NULL,
    autor character varying NOT NULL,
    date_pub character varying NOT NULL,
    cover character varying,
    resume text,
    prix integer DEFAULT 1 NOT NULL
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    16445    books_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    215                        0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    214            �            1259    16455    userr    TABLE     �   CREATE TABLE public.userr (
    id integer NOT NULL,
    pseudo character varying NOT NULL,
    mail character varying NOT NULL,
    mdp character varying NOT NULL,
    session character varying
);
    DROP TABLE public.userr;
       public         heap    postgres    false            �            1259    16454    userr_id_seq    SEQUENCE     �   CREATE SEQUENCE public.userr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.userr_id_seq;
       public          postgres    false    217            !           0    0    userr_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.userr_id_seq OWNED BY public.userr.id;
          public          postgres    false    216            s           2604    16474    basket user_id    DEFAULT     p   ALTER TABLE ONLY public.basket ALTER COLUMN user_id SET DEFAULT nextval('public.basket_user_id_seq'::regclass);
 =   ALTER TABLE public.basket ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    218    220    220            t           2604    16475    basket book_id    DEFAULT     p   ALTER TABLE ONLY public.basket ALTER COLUMN book_id SET DEFAULT nextval('public.basket_book_id_seq'::regclass);
 =   ALTER TABLE public.basket ALTER COLUMN book_id DROP DEFAULT;
       public          postgres    false    220    219    220            p           2604    16449    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            r           2604    16458    userr id    DEFAULT     d   ALTER TABLE ONLY public.userr ALTER COLUMN id SET DEFAULT nextval('public.userr_id_seq'::regclass);
 7   ALTER TABLE public.userr ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    16470    basket 
   TABLE DATA           <   COPY public.basket (user_id, book_id, quantity) FROM stdin;
    public          postgres    false    220   �$                 0    16446    books 
   TABLE DATA           P   COPY public.books (id, titre, autor, date_pub, cover, resume, prix) FROM stdin;
    public          postgres    false    215   �$                 0    16455    userr 
   TABLE DATA           ?   COPY public.userr (id, pseudo, mail, mdp, session) FROM stdin;
    public          postgres    false    217   �&       "           0    0    basket_book_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.basket_book_id_seq', 1, false);
          public          postgres    false    219            #           0    0    basket_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.basket_user_id_seq', 1, false);
          public          postgres    false    218            $           0    0    books_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.books_id_seq', 10, true);
          public          postgres    false    214            %           0    0    userr_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.userr_id_seq', 3, true);
          public          postgres    false    216            ~           2606    16501    basket basket_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_pkey PRIMARY KEY (user_id, book_id);
 <   ALTER TABLE ONLY public.basket DROP CONSTRAINT basket_pkey;
       public            postgres    false    220    220            v           2606    16451    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    215            x           2606    16466    userr mail_uniq 
   CONSTRAINT     J   ALTER TABLE ONLY public.userr
    ADD CONSTRAINT mail_uniq UNIQUE (mail);
 9   ALTER TABLE ONLY public.userr DROP CONSTRAINT mail_uniq;
       public            postgres    false    217            z           2606    16464    userr pseudo_uniq 
   CONSTRAINT     N   ALTER TABLE ONLY public.userr
    ADD CONSTRAINT pseudo_uniq UNIQUE (pseudo);
 ;   ALTER TABLE ONLY public.userr DROP CONSTRAINT pseudo_uniq;
       public            postgres    false    217            |           2606    16462    userr userr_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.userr
    ADD CONSTRAINT userr_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.userr DROP CONSTRAINT userr_pkey;
       public            postgres    false    217                       1259    16489    fki_book_id    INDEX     A   CREATE INDEX fki_book_id ON public.basket USING btree (book_id);
    DROP INDEX public.fki_book_id;
       public            postgres    false    220            �           1259    16483    fki_user_id    INDEX     A   CREATE INDEX fki_user_id ON public.basket USING btree (user_id);
    DROP INDEX public.fki_user_id;
       public            postgres    false    220            �           2606    16490    basket book_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket
    ADD CONSTRAINT book_id FOREIGN KEY (book_id) REFERENCES public.books(id) ON UPDATE CASCADE ON DELETE CASCADE;
 8   ALTER TABLE ONLY public.basket DROP CONSTRAINT book_id;
       public          postgres    false    215    220    3190            �           2606    16495    basket user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.userr(id) ON UPDATE CASCADE ON DELETE CASCADE;
 8   ALTER TABLE ONLY public.basket DROP CONSTRAINT user_id;
       public          postgres    false    217    220    3196                  x�3�4�4����� �]         �  x�}�An�0E��)x�Q"��ұwa�FZd(hi�%5Ɛt�]�9B��s�&=I�R��S@������3�X�\��J�LNL��U�
UHd����#
�}� �p4�g���n+���>�2H����>Y�T��(IP|�_��`wN�� V�
0rM�/�Z��g�y���~���a1�Yla^{f� 1�<�
��3�����aW����u4�V�)�w�b���w�蹛-w<5 /g�	�)���t������,�y�{ř\�ڃ�2*D����QaU+�P�,#�[sr���6�/�FI~[d�y�+��Z�[Ƒ[D��bfh}��V�3��#W�|X|c�`�6��$��ϡ���z����3t	��W�@d��$�)ڹNkO�h6i�>u�EM�~�ڀ�E�8�(��o:����>;���bH[���'�)7Nv,���t7��z9n�         b   x�3�,-N-2�����9�z����*FI*�*9�)e�aƕ���~�UF�fI.n�ن�y&�Q���.���zI�A~&��e�yޜ1~\1z\\\ � �     