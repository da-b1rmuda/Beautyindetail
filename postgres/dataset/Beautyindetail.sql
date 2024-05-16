--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-16 15:50:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 24619)
-- Name: categore_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categore_services (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.categore_services OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24618)
-- Name: Categore_services_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categore_services ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Categore_services_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 24627)
-- Name: masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.masters (
    id integer NOT NULL,
    idcategoryservice integer,
    lastname character varying,
    name character varying,
    patronymic character varying,
    phone character varying,
    address character varying,
    work_experience character varying,
    description character varying,
    photo character varying,
    date_of_birth date
);


ALTER TABLE public.masters OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24626)
-- Name: Masters_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.masters ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Masters_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 24613)
-- Name: record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record (
    id integer NOT NULL,
    day date,
    "time" time without time zone,
    id_services integer,
    id_client integer,
    id_masters integer
);


ALTER TABLE public.record OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24612)
-- Name: Record_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.record ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Record_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 24600)
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying,
    "time" character varying,
    price numeric,
    idcategoreservices integer
);


ALTER TABLE public.services OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24608)
-- Name: Services_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.services ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Services_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 24590)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    id_user integer,
    lastname character varying,
    name character varying,
    patronymic character varying,
    phone character varying,
    dateofbirth date,
    email character varying
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16401)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4881 (class 0 OID 24619)
-- Dependencies: 223
-- Data for Name: categore_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categore_services (id, name) FROM stdin;
1	Парикмахерские услуги
3	Маникюр, педикюр
4	Эпиляция, депиляция
2	Макияж, browbar
\.


--
-- TOC entry 4875 (class 0 OID 24590)
-- Dependencies: 217
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, id_user, lastname, name, patronymic, phone, dateofbirth, email) FROM stdin;
41	41	Иванова	Мария	Ивановна	89021273568	2024-03-08	\N
4	4	Идиатулова	Динара	Фидратовна	+79021283567	\N	idiatulova.dinara@yandex.ru
5	5	Кузьмина	Арина	Николаевна	89035784514	2000-07-13	kuzmina.a@gmail.com
495821	495821	Иванова	Мария	Ивановна	89021273568	2024-03-15	marisha1222@mail.ru
649425	649425	Идиатулова	Динара	Фидратовна	89021283567	2004-07-15	Idiatulova.dinara@yandex.ru
122220	122220	Шишкина	Екатерина	Григорьевна	89112233445	1999-10-15	\N
997106	997106	Григорьева	Екатерина	Ивановна	89112233445	1997-12-16	\N
\.


--
-- TOC entry 4883 (class 0 OID 24627)
-- Dependencies: 225
-- Data for Name: masters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.masters (id, idcategoryservice, lastname, name, patronymic, phone, address, work_experience, description, photo, date_of_birth) FROM stdin;
1	1	Иванова	Мария	Николаевна	89021546897	г.Димитровград, ул. Гагарина, д.8	5 лет	Опыт работы с различными типами волос и текстурами. Профессиональное владение инструментами и оборудованием. Умение консультировать клиентов и предлагать индивидуальные стилизации.Стремление к постоянному профессиональному развитию и следованию модным тенденциям.	.\\Image\\Master_parik.jpg	1994-08-15
2	2	Петрова	Анна	Сергеевна	89035556677	г. Димитровград, пр. Ленина, д. 75	4 года	Владею широким спектром техник и продуктов, обеспечивающих высокое качество макияжа. Глубокие знания в области цветовой гармонии, типов кожи и трендов в макияже. Умение работать с клиентами разного возраста, типа кожи и предпочтений, обеспечивая высокий уровень сервиса и удовлетворение клиентов.	.\\Image\\Master_BrowBar.jpg	1999-02-17
3	3	Сидорова	Екатерина	Александровна	89112233445	г. Димитровград, ул. Победы, д.74	6 лет	Опыт работы с различными материалами и инструментами для создания креативных дизайнов и обеспечения ухоженного вида ногтей. Знание актуальных трендов. Индивидуальный подход к каждому клиенту, стремление к высокому качеству услуг и удовлетворению потребностей клиентов. 	.\\Image\\Master_nailbar.jpg	2000-07-06
4	4	Кулькова	Марина	Олеговна	89041578745	г. Димитровград, ул. Курчатова, д 4, кв. 15	4 года	Знание различных методов эпиляции и их особенностей, умение проводить процедуры эффективно и безболезненно. Безупречное владение инструментами и средствами для эпиляции, обеспечивающее безопасность и комфорт клиентов. Понимание особенностей различных типов кожи и волос, а также умение консультировать клиентов по уходу после процедуры.	.\\Image\\Master_Dep.jpg	1998-01-02
17	1	Булкина	Екатерина	Григорьевна	89112233447	г. Димитровград, ул. Победы 7	6 лет		\N	1999-10-12
18	4	Булкина	Екатерина	Григорьевна	89112233445	г. Димитровград, ул. Победы 7	5 лет		\N	1999-10-14
\.


--
-- TOC entry 4879 (class 0 OID 24613)
-- Dependencies: 221
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record (id, day, "time", id_services, id_client, id_masters) FROM stdin;
2	2024-06-14	14:00:00	3	5	2
9	2024-06-10	12:10:00	3	5	2
1	2024-04-12	15:00:00	2	495821	3
3	2024-07-05	10:00:00	1	\N	3
6	2024-08-02	14:10:00	9	\N	18
8	2024-08-01	12:30:00	1	\N	3
4	2024-06-02	11:00:00	11	\N	2
5	2024-07-15	11:30:00	8	\N	4
\.


--
-- TOC entry 4876 (class 0 OID 24600)
-- Dependencies: 218
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, name, "time", price, idcategoreservices) FROM stdin;
1	Маникюр	60 минут	1800.00	3
2	Педикюр	90 минут	2300.00	3
3	Окрашевание ресниц	45 минут	700.00	2
4	Депиляция рук	15 минут	500.00	4
5	Формирование бровей	30 минут	500.00	2
6	Стрижка	45 минут	800.00	1
7	Окрашевание волос	120 минут	4000.00	1
8	Восковая эпиляция ног	60 минут	1600.00	4
9	Восковая эпиляция бикини	30 минут	1400.00	4
10	Наращивание ресниц	120 минут	2500.00	2
12	Эпиляция рук	30 минут	1000.00	4
13	Дизайн ногтей	90 минут	700.00	3
14	Укладка волос	60 минут	1500.00	1
15	Депиляция ног	20 минут	800.00	4
19	Ламинирование бровей	30 минут	500.00	2
11	Макияж	60 минут	1700.00	2
\.


--
-- TOC entry 4874 (class 0 OID 16401)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, password) FROM stdin;
997106	Grigka13	891772233445
41	Maria1	1454567
5	Arina	140720Ar
649425	Dinara1507	16042019Ad
4	Dinara	Динара15
495821	Maria5	1454567
1	admin	adminuser
122220	Katusha7	15101999
\.


--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 222
-- Name: Categore_services_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categore_services_Id_seq"', 9, true);


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 224
-- Name: Masters_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Masters_Id_seq"', 18, true);


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 220
-- Name: Record_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Record_Id_seq"', 9, true);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 219
-- Name: Services_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Services_Id_seq"', 20, true);


--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 4721 (class 2606 OID 24625)
-- Name: categore_services Categore_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categore_services
    ADD CONSTRAINT "Categore_services_pkey" PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 24670)
-- Name: clients Clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 24689)
-- Name: masters Masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters
    ADD CONSTRAINT "Masters_pkey" PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 24617)
-- Name: record Record_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT "Record_pkey" PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 24606)
-- Name: services Services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT "Services_pkey" PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 16408)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 24681)
-- Name: record Client; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT "Client" FOREIGN KEY (id_client) REFERENCES public.clients(id) NOT VALID;


--
-- TOC entry 4727 (class 2606 OID 24690)
-- Name: record Record_Id_masters_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT "Record_Id_masters_fkey" FOREIGN KEY (id_masters) REFERENCES public.masters(id) NOT VALID;


--
-- TOC entry 4725 (class 2606 OID 24713)
-- Name: services Services_id_categore_services_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT "Services_id_categore_services_fkey" FOREIGN KEY (idcategoreservices) REFERENCES public.categore_services(id) NOT VALID;


--
-- TOC entry 4724 (class 2606 OID 24671)
-- Name: clients User; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "User" FOREIGN KEY (id_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4729 (class 2606 OID 24708)
-- Name: masters masters_Id_category_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters
    ADD CONSTRAINT "masters_Id_category_service_fkey" FOREIGN KEY (idcategoryservice) REFERENCES public.categore_services(id) NOT VALID;


--
-- TOC entry 4728 (class 2606 OID 24725)
-- Name: record record_id_services_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT record_id_services_fkey FOREIGN KEY (id_services) REFERENCES public.services(id) NOT VALID;


-- Completed on 2024-05-16 15:50:52

--
-- PostgreSQL database dump complete
--

